import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    alias: {
      "pure-lit": resolve("./node_modules/pure-lit/lib/index.module.js"),
    },
  },
});
