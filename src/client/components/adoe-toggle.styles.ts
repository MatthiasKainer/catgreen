import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "./base.styles";

export const styles = [defaultStyles, css`
:host {
  display: flex;
  align-items: center;
  align-content: stretch;
  margin: 1rem;
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
  width: 40px;
  height: 20px;
  margin-left: 5px;
}

label input {
  opacity: 0;
  width:0;
  height:0;
}

span {
   position:absolute; 
   cursor:pointer; 
   top:0; 
   left:0; 
   right:0; 
   bottom: 0px; 
   background-color:var(--color-stage-accent);  
   border-radius: 20px;
}

span:before {
    position:absolute;
    content:"✖";
    color: var(--color-important);
    height: 20px;
    width :20px;
    left:-1px;
    background-color: var(--color-light);
    -webkit-transition:.4s;
    transition:.4s;
    border-radius: 20px;
    
    text-align: center;
}

span:hover {
   background-color:var(--color-highlight);  
}

input:checked + span:before {
    transform :translateX(20px);
    background-color:white;
    color: var(--color-on);
    content: "✔"
}
`]