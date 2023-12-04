import { html } from "lit";
import { pureLit } from "pure-lit";
import { name } from "../../storage";

export default pureLit(
  "adoe-controls-name",
  async ({ label, placeholder }) => {
    return html` <adoe-input
      label=${label}
      placeholder=${placeholder}
      value=${name.get().join(",")}
      @change=${(e: CustomEvent) => name.set(e.detail)}
      ><slot></slot
    ></adoe-input>`;
  },
  {
    defaults: { label: "", placeholder: "" },
  },
);
