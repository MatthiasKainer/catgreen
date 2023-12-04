import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "../base.styles";

export const styles = [
  defaultStyles,
  css`
    :host {
      display: flex;
      align-content: stretch;
    }
    :host > * {
      flex-grow: 1;
    }
  `,
];

export const buttonStyles = [
  defaultStyles,
  css`
    :host {
      align-items: center;
      display: flex;
    }
    adoe-button {
      flex-grow: 1;
    }
    adoe-button:hover svg {
      animation: rotate 2s infinite;
    }
  `,
];
