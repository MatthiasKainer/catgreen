import { describe, expect, it, vi, afterAll } from "vitest";
vi.mock("../service/env-init", () => {
  function EnvInit() {
    return {
      name: Promise.resolve("hola"),
      filter: Promise.resolve("mundo"),
    };
  }
  return { EnvInit };
});

import { name, filter } from ".";

describe("storage (online)", () => {
  afterAll(() => window.localStorage.clear());

  it("sets and gets a value from localStorage", () => {
    expect(name.get()).toEqual(["hola"]);
    expect(filter.get()).toEqual(["mundo"]);
  });
});
