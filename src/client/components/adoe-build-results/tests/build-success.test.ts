import { beforeEach, describe, expect, test } from "vitest";
import component from "../adoe-build-results";
import { name } from "../../../storage";

import { setup, statusHandlers } from "../../../test-utils/msw";

const server = setup(...statusHandlers);
server.listen();

const getDiffableHTML = (text: string) =>
  text
    .replace(/\s+/gm, " ")
    .replace(/<!--.*?-->/gm, "")
    .replace(/<style>.*?<\/style>/gm, "");

const dom = (component: Element) =>
  getDiffableHTML(component.shadowRoot?.innerHTML ?? "");

describe("when there is no breaking build", () => {
  beforeEach(async () => {
    name.set("test");
    document.body.appendChild(component);
  });

  test("show a lovely cat gif after some suspense!", async () => {
    expect(dom(component)).toEqual("<slot></slot>");

    await component.suspenseComplete();
    expect(dom(component)).toContain("cat");
  });
});
describe("when there is a breaking build", () => {
  beforeEach(async () => {
    name.set("bad");
    document.body.appendChild(component);
  });

  test("don't show the cat, show a card with the breaking thing after some suspense", async () => {
    expect(dom(component)).toEqual("<slot></slot>");

    await component.suspenseComplete();
    expect(dom(component)).toContain("Blame");
    expect(dom(component)).toMatchInlineSnapshot(
      '"<div> <div class=\\"failed\\"> <h2> <a target=\\"_blank\\" href=\\"https://example.com/url\\"></a> </h2> <div> <span>batchedCI</span> <small>Blame: T1000</small> <small>1 year ago</small> </div> </div> </div>"',
    );
  });
});
