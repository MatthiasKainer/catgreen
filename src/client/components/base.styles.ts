import { css } from "nested-css-to-flat/lit-css";

export const defaultStyles = css`
:host {
    font-family: var(--font-family);

}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
    0% {
        transform: scale(0.9);
        opacity: 0.3;
    }
    25% {
        transform: scale(1.0);
        opacity: 1;
    }
    100% {
        transform: scale(0.9);
        opacity: 0.3;
    }
}

@keyframes pulseStrong {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    25% {
        transform: scale(1.0);
        opacity: 1;
    }
    100% {
        transform: scale(0.9);
        opacity: 0;
    }
}
`