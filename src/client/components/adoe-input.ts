import { html } from "lit";
import { pureLit, dispatch } from "pure-lit";
import { styles } from "./adoe-input.styles"

export default pureLit("adoe-input", (el) => {
  return html`
        <label for=${el.label}>${el.label}</label>
        <input
            type="text"
            id="${el.label}"
            value=${el.value}
            placeholder="${el.placeholder}"
            @keypress=${(e: KeyboardEvent) => {
      const element = (e.target as HTMLInputElement);
      if (element.value !== "" && e.key === "Enter") {
        dispatch(el, "change", element.value)
      }
    }} @blur=${(e: Event) => {
      const element = (e.target as HTMLInputElement);
      if (element.value !== "") {
        dispatch(el, "change", element.value)
      }
    }}
        /><slot></slot>`
}, {
  defaults: {
    value: "",
    label: "",
    placeholder: ""
  },
  styles
})