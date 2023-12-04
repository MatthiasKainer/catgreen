import { beforeEach, describe, expect, test } from "vitest";
import { getDiffableHTML } from "@open-wc/semantic-dom-diff";

import component from "./adoe-button";

const dom = (component: Element) =>
  getDiffableHTML(component.shadowRoot?.innerHTML ?? "");

describe("a default button", () => {
  beforeEach(async () => {
    document.body.appendChild(component);
  });

  test("shows a default button", () => {
    expect(dom(component)).toMatchInlineSnapshot(`
          "<button>
            <slot>
            </slot>
          </button>
          "
        `);
  });
});
