import { describe, expect, it } from 'vitest';
import { capForCrutches, type JudgeResult } from './judge.ts';

function makeResult(score: number, crutchCount: number): JudgeResult {
  return {
    score,
    verdict: 'test',
    authenticity: 5,
    authenticity_notes: 'test',
    emotion_impact: 5,
    emotion_impact_notes: 'test',
    ai_crutches: Array.from({ length: crutchCount }, (_, i) => `crutch ${i}`),
    worst_lines: [],
    would_a_human_type_this: true,
  };
}

describe('capForCrutches', () => {
  it('leaves score unchanged with 2 crutches (below the 3-crutch threshold)', () => {
    const r = capForCrutches(makeResult(8, 2));
    expect(r.score).toBe(8);
  });

  it('caps score to exactly 6 with 3 crutches, leaving would_a_human_type_this unflipped', () => {
    const r = capForCrutches(makeResult(9, 3));
    expect(r.score).toBe(6);
    expect(r.would_a_human_type_this).toBe(true);
  });

  it('caps score to exactly 6 with 4 crutches, leaving would_a_human_type_this unflipped', () => {
    const r = capForCrutches(makeResult(9, 4));
    expect(r.score).toBe(6);
    expect(r.would_a_human_type_this).toBe(true);
  });

  it('caps score to 4 and flips would_a_human_type_this to false at the 5-crutch boundary', () => {
    const r = capForCrutches(makeResult(9, 5));
    expect(r.score).toBe(4);
    expect(r.would_a_human_type_this).toBe(false);
  });

  it('caps score to 4 and flips would_a_human_type_this to false with 7 crutches and score 9', () => {
    const r = capForCrutches(makeResult(9, 7));
    expect(r.score).toBe(4);
    expect(r.would_a_human_type_this).toBe(false);
  });

  it('never raises a score already at or below its cap', () => {
    const r = capForCrutches(makeResult(3, 0));
    expect(r.score).toBe(3);
  });

  it('leaves authenticity untouched when the score is capped', () => {
    const r = capForCrutches(makeResult(9, 5));
    expect(r.authenticity).toBe(5);
  });
});
