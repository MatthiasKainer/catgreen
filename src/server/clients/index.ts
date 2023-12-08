import * as ado from "./ado";
import * as gh from "./gh";
import * as gl from "./gl";
import { Client } from "./type";

const providers = { ado, gh, gl };
type Providers = "ado" | "gh" | "gl";

function isValid(provider: string): provider is Providers {
  return Object.hasOwn(providers, provider);
}

export const getApi = (provider: Providers | string): Client | null => {
  if (!isValid(provider)) {
    return null;
  }

  return providers[provider];
};
