export const store = <T extends Object>(key: string) => {
  const triggers: (() => void)[] = [];
  const notify = () => triggers.forEach((trigger) => trigger());
  return {
    set: (value: T) => (
      window.localStorage.setItem(key, value?.toString()), notify()
    ),
    get: () => window.localStorage.getItem(key),
    onChange: (delegate: () => void) => triggers.push(delegate),
  };
};

export const name = (() => {
  const storage = store("name");
  return {
    ...storage,
    get: () =>
      storage
        .get()
        ?.split(",")
        .map((k) => k.trim()) ?? [],
  };
})();
export const filter = (() => {
  const storage = store("filter");
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
