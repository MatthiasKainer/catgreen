import { expect, test } from "vitest";
import { magicResult as magicFilter, objectivedFilter } from "./result-filter";
import response from "../test-utils/response.json";
import { Build } from "../../domain/build";

test("it will give only failing results if nothing else set", () => {
  const results = magicFilter(response.data as Build[]);
  expect(results).toMatchSnapshot();
  expect(results.every(({ result }) => result === "failed")).toBe(true);
});

test("it will give failing and running results if specified", () => {
  const results = magicFilter(response.data as Build[], true);
  expect(results).toMatchSnapshot();
  expect(results.length).toBe(20);
  expect(
    results.every(({ result }) => result === "failed" || result === "running"),
  ).toBe(true);
});

test("it will create an objectived filter correctly", () => {
  expect(objectivedFilter()).toStrictEqual({});
  expect(objectivedFilter(":::")).toStrictEqual({});
  expect(objectivedFilter("mauahaha")).toStrictEqual({});
  expect(objectivedFilter("meta.blame:doc-orc")).toEqual({
    "meta.blame": ["doc-orc"],
  });
  expect(objectivedFilter(" meta.blame:doc-orc ")).toEqual({
    "meta.blame": ["doc-orc"],
  });
  expect(objectivedFilter("meta.blame : doc-orc ")).toEqual({
    "meta.blame": ["doc-orc"],
  });
  expect(
    objectivedFilter("meta.blame:doc-orc", "meta.blame:grumpy-orc"),
  ).toEqual({ "meta.blame": ["doc-orc", "grumpy-orc"] });
  expect(
    objectivedFilter(
      "meta.blame:doc-orc",
      "meta.blame:grumpy-orc",
      "name:dopey-dragon",
    ),
  ).toEqual({
    "meta.blame": ["doc-orc", "grumpy-orc"],
    name: ["dopey-dragon"],
  });
});

test("it will filter correctly", () => {
  let result = magicFilter(
    response.data as Build[],
    true,
    "name:sleepy-codebase-ng",
  );
  expect(result.length).toBe(1);
  expect(result.every(({ name }) => name === "sleepy-codebase-ng")).toBe(true);

  result = magicFilter(response.data as Build[], true, "meta.blame:doc-orc");
  expect(result.length).toBe(1);
  expect(result.every(({ meta }) => meta.blame === "doc-orc")).toBe(true);

  result = magicFilter(
    response.data as Build[],
    true,
    "meta.blame:doc-orc",
    "result:success",
  );
  expect(result.length).toBe(12);
  expect(result.every(({ meta }) => meta.blame === "doc-orc")).toBe(true);
});
