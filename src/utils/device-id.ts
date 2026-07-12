// A layered, login-free device id for like dedup. No single layer is trusted —
// each covers where the others fail:
//   • localStorage + cookie — the actual persistence. Read from either, written
//     to both, so clearing one alone doesn't reset you.
//   • a device-signal seed — when BOTH stores are cleared, we re-derive the id
//     from stable-ish signals (screen, timezone, languages, CPU/memory, plus a
//     best-effort audio fingerprint) so the same device tends to recover the
//     same id instead of counting as brand new.
// Honest limits: a determined user clearing storage on a browser that also
// randomizes its signals (Safari) reads as a new device — fine for a like
// button. Two identical, freshly-wiped devices can collide. The id is opaque and
// gets HMAC'd server-side; the raw signals never leave the browser.
import { computeAudioFingerprint, sha256Hex } from './audio-fingerprint';

const STORE_KEY = 'bl_like_id';
const COOKIE_MAX_AGE = 31_536_000;

function fromStores(): string | null {
  try {
    const ls = localStorage.getItem(STORE_KEY);
    if (ls) return ls;
  } catch {
    /* storage blocked (private mode / disabled) — fall through to cookie */
  }
  try {
    const m = document.cookie.match(/(?:^|;\s*)bl_like_id=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function persist(id: string): void {
  try {
    localStorage.setItem(STORE_KEY, id);
  } catch {
    /* storage blocked — the cookie still carries it */
  }
  try {
    document.cookie = `${STORE_KEY}=${id}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
  } catch {
    /* cookies blocked — localStorage (if any) still carries it */
  }
}

function stableSignals(): string {
  try {
    const n = navigator;
    const s = screen;
    const tz = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return '';
      }
    })();
    return [
      n.userAgent,
      (n.languages ?? [n.language]).join(','),
      `${s.width}x${s.height}x${s.colorDepth}`,
      tz,
      n.hardwareConcurrency ?? '',
      (n as Navigator & { deviceMemory?: number }).deviceMemory ?? '',
      (n as Navigator & { platform?: string }).platform ?? '',
    ].join('|');
  } catch {
    return '';
  }
}

function randomId(): string {
  try {
    return `r_${crypto.randomUUID()}`;
  } catch {
    return `r_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
  }
}

async function derive(): Promise<string> {
  const fp = await computeAudioFingerprint();
  const seed = [stableSignals(), fp].filter(Boolean).join('~');
  // No signals (a non-DOM/SSR context) → a random id rather than a constant all
  // such callers would share. With signals, a stable-ish derived id whose d_ tag
  // records it came from signals, not a stored value.
  if (!seed) return randomId();
  return `d_${(await sha256Hex(seed)).slice(0, 40)}`;
}

export async function getDeviceId(): Promise<string> {
  const existing = fromStores();
  const id = existing ?? (await derive());
  persist(id);
  return id;
}
