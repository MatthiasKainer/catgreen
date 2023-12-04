import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "./base.styles";

export const styles = [
  defaultStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      align-content: stretch;
      margin: 1vw;
    }
    label {
      display: flex;
      align-items: center;
      align-content: stretch;
      cursor: pointer;
    }
    label div {
      position: relative;
      display: inline-block;
      width: 3vw;
      height: 2vw;
      margin-left: 5px;
    }

    label input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0px;
      background-color: var(--color-stage-accent);
      border-radius: 20px;
    }

    span:before {
      position: absolute;
      content: "✖";
      color: var(--color-important);
      width: 2vw;
      height: 2vw;
      left: -1px;
      background-color: var(--color-light);
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 20px;

      text-align: center;
    }

    span:hover {
      background-color: var(--color-highlight);
    }

    input:checked + span:before {
      transform: translateX(1.5vw);
      background-color: white;
      color: var(--color-on);
      content: "✔";
    }
  `,
];
