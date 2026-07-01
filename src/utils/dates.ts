export const AUTHOR_TIMEZONE = 'America/New_York';

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: AUTHOR_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: AUTHOR_TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDatetimeAttr(date: Date): string {
  return date.toLocaleDateString('sv-SE', { timeZone: AUTHOR_TIMEZONE });
}

/** Full UTC ISO-8601 (with time) — the canonical machine value stored in the `datetime` attr. */
export function toISO(date: Date): string {
  return date.toISOString();
}

/** No-JS / SSR fallback: UTC date + time, explicitly labelled so it's never mistaken for local. */
export function formatUTCFallback(date: Date, withTime = true): string {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit', hour12: false } : {}),
  };
  return date.toLocaleString('en-US', opts) + ' UTC';
}
