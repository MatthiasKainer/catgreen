import { html } from "lit";
import { dispatch, pureLit } from "pure-lit";
import { styles } from "./adoe-toggle.styles";
import { showInProgress } from "../storage";

interface CheckboxChangeEvent extends Event {
    target: HTMLInputElement;
  }

export default pureLit("adoe-toggle", (el) => html`
    <label>
        <slot></slot>
        <div>
            <input 
                type="checkbox" 
                ?checked=${showInProgress.get()}
                @change=${(ev: CheckboxChangeEvent) => (console.log("Checking box directly", ev.target.checked), dispatch(el, "checked", ev.target.checked))}>
            <span></span>
        </div>
    </label>`, { styles })