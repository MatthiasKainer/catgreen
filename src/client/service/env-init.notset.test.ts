import { expect, test } from "vitest";
import { setup, initNonDefinedEnvHandlers } from "../test-utils/msw";

import { EnvInit } from "./env-init";

test("Returns undefined if nothing available in the env", async () => {
  const server = setup(...initNonDefinedEnvHandlers);
  server.listen();
  expect(await new EnvInit().name).toBeUndefined();
  expect(await new EnvInit().filter).toBeUndefined();
});
