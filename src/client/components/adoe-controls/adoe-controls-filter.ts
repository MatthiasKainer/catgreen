import { html } from "lit";
import { pureLit } from "pure-lit";
import { filter } from "../../storage";

export default pureLit(
  "adoe-controls-filter",
  async ({ label, placeholder }) => {
    return html` <adoe-input
      label=${label}
      placeholder=${placeholder}
      value=${filter.get().join(",")}
      @change=${(e: CustomEvent) => filter.set(e.detail)}
      ><slot></slot
    ></adoe-input>`;
  },
  {
    defaults: { label: "", placeholder: "" },
  },
);
