import { expect, test } from "vitest";
import { setup, initDefinedEnvHandlers } from "../test-utils/msw";

import { EnvInit } from "./env-init";

test("Returns the name when there's one available", async () => {
  const server = setup(...initDefinedEnvHandlers);
  server.listen();
  expect(await new EnvInit().name).toBe("gh:MatthiasKainer");
  expect(await new EnvInit().filter).toBe("meta.blame:Matthias Kainer");
});
