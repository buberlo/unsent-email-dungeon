// src/utils.ts
/**
 * Small shared utilities for Unsent Email Dungeon.
 *
 * These helpers are intentionally dependency-free so they can be used from
 * game logic, rendering, and UI code without pulling in heavier modules.
 */

/** Returns a random integer between min and max, inclusive. */
export function randInt(min: number, max: number): number {
  const low = Math.ceil(min);
  const high = Math.floor(max);

  if (low > high) {
    throw new Error(`randInt: min ${min} exceeds max ${max}`);
  }

  return Math.floor(Math.random() * (high - low + 1)) + low;
}

/** Returns a random float between min and max, inclusive of min. */
export function randFloat(min = 0, max = 1): number {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  return low + Math.random() * (high - low);
}

/** Returns true with the given probability, where 1 means always true. */
export function chance(probability: number): boolean {
  const safeProbability = Number.isFinite(probability) ? clamp01(probability) : 0;

  return Math.random() < safeProbability;
}

/** Clamps a value between min and max. */
export function clamp(value: number, min: number, max: number): number {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  return Math.min(high, Math.max(low, value));
}

/** Clamps a value between 0 and 1. */
export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

/** Picks one random item from a non-empty list. */
export function pick<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('pick: expected at least one item');
  }

  return items[randInt(0, items.length - 1)] as T;
}

/** Picks a random subset of items