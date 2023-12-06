import * as ado from "./ado";
import * as gh from "./gh";
import { Client } from "./type";

const providers = { ado, gh };
type Providers = "ado" | "gh";

function isValid(provider: string): provider is Providers {
  return Object.hasOwn(providers, provider);
}

export const getApi = (provider: Providers | string): Client | null => {
  if (!isValid(provider)) {
    return null;
  }

  return providers[provider];
};
