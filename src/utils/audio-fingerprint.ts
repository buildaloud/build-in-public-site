// A per-device signal from the Web Audio API, used as ONE input to the layered
// device id (see device-id.ts) — inspired by Abhishek Saha's no-auth like
// button. Rendering a fixed oscillator through a compressor in an
// OfflineAudioContext yields output that varies by device/browser audio stack.
// Returns null when Web Audio is unavailable.
//
// Honest limit: Safari and privacy browsers deliberately randomize this to
// defeat fingerprinting, so it is NOT trusted alone — it's one signal among
// several, and localStorage + cookie carry the actual persistence.

const SAMPLE_START = 4500;
const SAMPLE_END = 5000;

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

type OfflineCtor = typeof OfflineAudioContext;

function offlineAudioContext(): OfflineCtor | null {
  const w = globalThis as unknown as { OfflineAudioContext?: OfflineCtor; webkitOfflineAudioContext?: OfflineCtor };
  return w.OfflineAudioContext ?? w.webkitOfflineAudioContext ?? null;
}

export async function computeAudioFingerprint(): Promise<string | null> {
  try {
    const Ctx = offlineAudioContext();
    if (!Ctx) return null;

    const ctx = new Ctx(1, SAMPLE_END, 44100);
    const oscillator = ctx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 10000;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    oscillator.connect(compressor);
    compressor.connect(ctx.destination);
    oscillator.start(0);

    const rendered = await ctx.startRendering();
    const channel = rendered.getChannelData(0);
    let acc = 0;
    for (let i = SAMPLE_START; i < SAMPLE_END; i++) acc += Math.abs(channel[i]);

    return await sha256Hex(acc.toString());
  } catch {
    return null;
  }
}
