import { html } from "lit";
import { pureLit } from "pure-lit";
import { styles } from "./adoe-button.style";

export default pureLit(
  "adoe-button",
  () => html`<button><slot></slot></button>`,
  { styles },
);
