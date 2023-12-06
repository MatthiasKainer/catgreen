import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../../service/env-init", () => {
  function EnvInit() {
    return {
      name: Promise.resolve("hola"),
      filter: Promise.resolve("mundo"),
    };
  }
  return { EnvInit };
});
import component from "../adoe-build-results";
import { name } from "../../../storage";
import * as sdom from "@open-wc/semantic-dom-diff";

import { setup, statusHandlers } from "../../../test-utils/msw";

const server = setup(...statusHandlers);
server.listen();

const dom = (component: Element) =>
  sdom.getDiffableHTML(component.shadowRoot?.innerHTML ?? "");

describe("build results when there is no name", () => {
  beforeEach(async () => {
    name.set("");
    document.body.appendChild(component);
  });

  test("returns nothing, not even cat gifs!", () => {
    expect(dom(component)).toMatchInlineSnapshot(`
          "<slot>
          </slot>
          "
        `);
  });
});
