import { describe, expect, test } from "vitest";
import { calculateZoom } from "../adoe-build-results";

describe("dynamic zoom function", () => {
  test("no zoom if no elements", () => {
    expect(calculateZoom(0)).toBe(1);
  });

  test("zooms out the more elements are on the screen, but no further then 20%", () => {
    expect(calculateZoom(1)).toBe(1);
    expect(calculateZoom(10)).toBe(0.75);
    expect(calculateZoom(20)).toBe(0.6747425010840047);
    expect(calculateZoom(30)).toBe(0.6307196863200843);
    expect(calculateZoom(50)).toBe(0.5752574989159953);
    expect(calculateZoom(100)).toBe(0.5);
    expect(calculateZoom(200)).toBe(0.4247425010840047);
    expect(calculateZoom(1000)).toBe(0.25);
    expect(calculateZoom(2000)).toBe(0.2);
    expect(calculateZoom(3000)).toBe(0.2);
    expect(calculateZoom(10000)).toBe(0.2);
  });
});
