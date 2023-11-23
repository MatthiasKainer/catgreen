import { css } from "nested-css-to-flat/lit-css";
import { defaultStyles } from "./base.styles";

export const styles = [defaultStyles, css`
:host {
  display: flex;
  align-items: center;
  align-content: stretch;
  margin: 1rem;
}
:host > * {
  flex-grow: 1;
}

label {
  margin-right: 0.5rem;
  font-weight: bold;
}

input[type=text] {
  flex-grow: 3;
  padding: 0.5rem;
  background-color: var(--color-stage-accent);
  border:none;
  border-bottom: solid var(--color-light) thin;
            
  transition-duration:.3s; 
  transition-timing-function:cubic-bezier(.57,-.01,.43,-.03); 
   
  &:focus { 
    outline:none; 
    background-color: var(--color-stage-accent-2); 
  }
   
  &::placeholder { color:#aaa; font-style:normal; }

  
  &:hover:not(:focus) {      
    background-color: var(--color-highlight); 
  }
  `]