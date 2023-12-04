import { Build } from "../../domain/build";

export const objectivedFilter = (...filter: string[]) =>
  filter.reduce(
    (result, current) => {
      const [key, value] = current.split(":");
      if (!value) return result;
      result[key.trim()] = [...(result[key] ?? []), value.trim()];
      return result;
    },
    {} as { [key: string]: string[] },
  );

function getValue(obj: unknown, path: string) {
  return path.split(".").reduce(function (prev, curr) {
    return prev ? (prev as any)[curr] : null;
  }, obj);
}

export const magicResult = (
  builds: Build[],
  showInProgress: boolean = false,
  ...filter: string[]
) => {
  const possibleResults = ["failed"];
  if (showInProgress === true) {
    possibleResults.push("running");
  }

  const objFilter = objectivedFilter(...filter);
  objFilter.result = [...(objFilter.result ?? []), ...possibleResults];

  return builds.filter((item: Build) => {
    const compare = (key: string) => (val: string) =>
      getValue(item, key) === val;
    if (
      Object.entries(objFilter).every(([key, values]) =>
        values.some(compare(key)),
      )
    )
      return true;
    return false;
  });
};
