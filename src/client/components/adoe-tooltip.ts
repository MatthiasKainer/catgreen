import { html } from "lit";
import { css } from "nested-css-to-flat/lit-css";
import { pureLit } from "pure-lit";
import {styles} from "./adoe-tooltip.styles"

pureLit("adoe-tooltip", ({tooltip}) => {
    return html`<div><slot></slot><div>${tooltip}</div></div>`   
}, {
    styles,
    defaults: {
        tooltip: ""
    }
})