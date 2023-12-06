import { EnvInit } from "../service/env-init";

export const store = <T extends Object>(key: string) => {
  const triggers: (() => void)[] = [];
  const notify = () => triggers.forEach((trigger) => trigger());
  const set = (value: T) => (
    window.localStorage.setItem(key, value?.toString() ?? ""), notify()
  );

  return {
    set,
    get: () => window.localStorage.getItem(key),
    onChange: (delegate: () => void) => triggers.push(delegate),
  };
};

export const name = await (async () => {
  const storage = store("name");
  const name = await new EnvInit().name;
  if (!storage.get()) {
    storage.set(name);
  }
  return {
    ...storage,
    get: () =>
      storage
        .get()
        ?.split(",")
        .map((k) => k.trim()) ?? [],
  };
})();
export const filter = await (async () => {
  const storage = store("filter");
  storage.set(await new EnvInit().filter);
  return {
    ...storage,
    get: () =>
      storage
        .get()
        ?.split(",")
        .map((k) => k.trim()) ?? [],
  };
})();
export const showInProgress = (() => {
  const storage = store<boolean>("showInProgress");
  return {
    ...storage,
    get: () => storage.get() !== "false",
  };
})();
