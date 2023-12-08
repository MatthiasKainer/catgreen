import { Build } from "../../domain/build";

export type Client = {
  client: (name: string) => {
    load: () => Promise<Build[]>;
  };
};
