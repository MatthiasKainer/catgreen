import { Build } from "../../domain/build";

export type Client = {
  client: (name: string) => {
    load: () => Promise<Build[]>;
  };
  text: {
    "filter-name": {
      label: string;
      placeholder?: string;
    };
    "filter-progress": string;
  };
};
