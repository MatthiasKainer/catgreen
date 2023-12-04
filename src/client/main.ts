import { html } from "lit";
import { pureLit } from "pure-lit";
import "./components";
import "./style.css";
import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "./components/base.styles";

pureLit(
  "adoe-dashboard",
  async () =>
    html` <adoe-controls></adoe-controls>
      <adoe-build-results>
        <div id="loading"></div>
        <cite
          ><a href="https://pixabay.com/users/lohrelei-1422286/"
            >Loading Image by Lohrelei</a
          >
          on pixabay</cite
        >
      </adoe-build-results>`,
  {
    styles: [
      defaultStyles,
      css`
        :host {
          width: 100vw;
          height: 100vh;
        }
        #loading {
          background-image: url(/assets/1144200-e91e63.svg);
          background-size: contain;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          width: 100%;
          height: 90vh;
          animation-name: pulseStrong;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
        cite {
          position: absolute;
          bottom: 0;
          right: 0;
          opacity: 1 !important;
        }
      `,
    ],
  },
);
