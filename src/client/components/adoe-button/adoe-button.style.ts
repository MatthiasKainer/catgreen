import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "../base.styles";

export const styles = [
  defaultStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      align-content: stretch;
      margin: 1vw;
    }
    :host > * {
      flex-grow: 1;
    }
    button {
      cursor: pointer;
    }
  `,
];
