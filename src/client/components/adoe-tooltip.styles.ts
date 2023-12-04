import { css } from "nested-css-to-flat/lit-css";

export const styles = css`
  :host {
    position: relative;
    display: block;
    cursor: help;
    margin: 1vw;
  }

  div > div {
    visibility: hidden;
    opacity: 0;
    border: 1px solid var(--color-stage);
    background-color: var(--color-stage-accent);
    color: var(--color-light);
    white-space: pre;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1rem;
    z-index: 1;
    transform: opacity 1s;
    padding: 1rem;
  }

  div:hover div,
  div:focus div {
    visibility: visible;
    opacity: 1;
  }
`;
