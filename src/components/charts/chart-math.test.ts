import { describe, it, expect } from 'vitest';
import { scaleLinear, niceCeiling, buildLinePath, pickTickIndices, nearestIndex, formatTickLabel, niceTicks } from './chart-math';

describe('scaleLinear', () => {
  it('maps a domain value to the corresponding range value', () => {
    const scale = scaleLinear([0, 10], [0, 100]);
    expect(scale(5)).toBe(50);
    expect(scale(0)).toBe(0);
    expect(scale(10)).toBe(100);
  });

  it('falls back to the range start when the domain is degenerate (min === max)', () => {
    const scale = scaleLinear([5, 5], [0, 100]);
    expect(scale(5)).toBe(0);
  });
});

describe('niceCeiling', () => {
  it('rounds a max value up to a round number above it', () => {
    expect(niceCeiling(218)).toBeGreaterThanOrEqual(218);
    expect(niceCeiling(218) % 1).toBe(0);
  });

  it('returns a positive minimum ceiling when all values are zero', () => {
    expect(niceCeiling(0)).toBeGreaterThan(0);
  });
});

describe('buildLinePath', () => {
  it('builds an SVG path string that moves to the first point then lines to the rest', () => {
    const path = buildLinePath([{ x: 0, y: 10 }, { x: 5, y: 20 }, { x: 10, y: 0 }]);
    expect(path).toBe('M0,10 L5,20 L10,0');
  });

  it('returns an empty string for no points', () => {
    expect(buildLinePath([])).toBe('');
  });
});

describe('pickTickIndices', () => {
  it('spreads indices evenly across the length, always including first and last', () => {
    const indices = pickTickIndices(28, 6);
    expect(indices[0]).toBe(0);
    expect(indices[indices.length - 1]).toBe(27);
    expect(indices.length).toBeLessThanOrEqual(6);
    expect(new Set(indices).size).toBe(indices.length);
  });

  it('never returns more indices than the available length', () => {
    expect(pickTickIndices(3, 6)).toEqual([0, 1, 2]);
  });
});

describe('nearestIndex', () => {
  it('finds the closest data index to a pixel x position across an evenly spaced width', () => {
    expect(nearestIndex(0, 270, 28)).toBe(0);
    expect(nearestIndex(270, 270, 28)).toBe(27);
    expect(nearestIndex(135, 270, 28)).toBe(14);
  });

  it('clamps out-of-range positions to the nearest valid index', () => {
    expect(nearestIndex(-50, 270, 28)).toBe(0);
    expect(nearestIndex(9999, 270, 28)).toBe(27);
  });
});

describe('niceTicks', () => {
  it('dedupes ticks that round to the same integer on a small domain (max=1)', () => {
    expect(niceTicks(1, 3)).toEqual([0, 1]);
  });

  it('keeps every tick distinct when they round to different integers (max=2)', () => {
    expect(niceTicks(2, 3)).toEqual([0, 1, 2]);
  });

  it('always includes 0 and the max as the first and last tick', () => {
    const ticks = niceTicks(40, 4);
    expect(ticks[0]).toBe(0);
    expect(ticks[ticks.length - 1]).toBe(40);
  });

  it('never returns duplicate values', () => {
    const ticks = niceTicks(1, 4);
    expect(new Set(ticks).size).toBe(ticks.length);
  });
});

describe('formatTickLabel', () => {
  it('formats an ISO date string as a short UTC month + day label', () => {
    expect(formatTickLabel('2026-07-14')).toBe('Jul 14');
  });

  it('does not shift the date across a UTC day boundary', () => {
    expect(formatTickLabel('2026-01-01')).toBe('Jan 1');
  });
});
