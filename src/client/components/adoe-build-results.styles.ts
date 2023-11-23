import { css } from "nested-css-to-flat/lit-css"
import { defaultStyles } from "./base.styles";

export const styles = [defaultStyles, css`
    :host {
        display:flex;
        flex-wrap: wrap;
        align-content: stretch;
    }

    div {
        flex-grow: 1;
        margin: 1em;
        padding: 1em;
        color: white;
    }
    .failed {
        background-color: var(--color-important);
    }
    .running {
        background-color: var(--color-informative);
        animation-name: pulse;
        animation-duration: 4s;
        animation-iteration-count: infinite;
    }
    div > div {
        display:flex;
        justify-content: space-between;
    }
    img {
        width:100vw; 
        height:90vh; 
        object-fit:cover;
    }
    a {
        color: white;
    }
    `];