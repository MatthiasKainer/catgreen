import { getTimeAgo } from "./time";

import {describe, test, expect} from "vitest"

describe('getTimeAgo', () => {
  test('returns undefined for a non-date', () => {
    expect(getTimeAgo(null as any as string)).toBe(undefined);
    expect(getTimeAgo(undefined as any as string)).toBe(undefined);
    expect(getTimeAgo("lalala")).toBe(undefined);
  });

  test('returns "X seconds ago" for small time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5000);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ seconds ago/);
  });

  test('returns "X minutes ago" for medium time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 60 * 1000 * 5);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ minutes ago/);
  });

  test('returns "X hours ago" for larger time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 60 * 60 * 1000 * 5);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ hours ago/);
  });

  test('returns "X days ago" for even larger time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 24 * 60 * 60 * 1000 * 5);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ days ago/);
  });

  test('returns "X months ago" for very large time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000 * 5);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ months ago/);
  });

  test('returns "X years ago" for extremely large time differences', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000 * 5);
    expect(getTimeAgo(date.toISOString())).toMatch(/\d+ years ago/);
  });
});