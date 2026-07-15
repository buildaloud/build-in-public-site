export function scaleLinear(domain: [number, number], range: [number, number]): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) return () => r0;
  return (value: number) => r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
}

/** Round a data max up to a "nice" gridline-friendly ceiling (1/2/5 × 10^n). Never zero. */
export function niceCeiling(max: number): number {
  if (max <= 0) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  const normalized = max / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

/** Evenly spaced tick values across [0, max], deduped after integer rounding — small
 *  domains (e.g. max=1) would otherwise repeat the same rounded label. */
export function niceTicks(max: number, count: number): number[] {
  if (count <= 1) return [Math.round(max)];
  const values = Array.from({ length: count }, (_, i) => Math.round((max * i) / (count - 1)));
  return Array.from(new Set(values));
}

export function buildLinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
}

/** Evenly spaced indices across [0, length-1], always including both ends, deduped. */
export function pickTickIndices(length: number, count: number): number[] {
  if (length <= 0) return [];
  if (length <= count) return Array.from({ length }, (_, i) => i);
  const raw = Array.from({ length: count }, (_, i) => Math.round((i * (length - 1)) / (count - 1)));
  return Array.from(new Set(raw));
}

/** Nearest data index for a pixel x position, treating `length` points as evenly spread across `width`. */
export function nearestIndex(x: number, width: number, length: number): number {
  if (length <= 1) return 0;
  const step = width / (length - 1);
  const raw = Math.round(x / step);
  return Math.min(length - 1, Math.max(0, raw));
}

const TICK_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Short "Mon D" label for a `YYYY-MM-DD` string, parsed as UTC to avoid local-timezone day shift. */
export function formatTickLabel(isoDate: string): string {
  const [, month, day] = isoDate.split('-').map(Number);
  return `${TICK_MONTHS[month - 1]} ${day}`;
}

export type StackSegment = { key: string; value: number; pct: number };

/**
 * Percent-of-total width for each part of a horizontal stacked bar. Zero/negative
 * parts are dropped (nothing to render at 0% width); an all-zero input returns []
 * so the caller can fall back to an empty state instead of drawing an empty bar.
 */
export function stackSegments(parts: { key: string; value: number }[]): StackSegment[] {
  const total = parts.reduce((sum, p) => sum + Math.max(0, p.value), 0);
  if (total <= 0) return [];
  return parts
    .filter((p) => p.value > 0)
    .map((p) => ({ key: p.key, value: p.value, pct: (p.value / total) * 100 }));
}
