export interface Pipeline {
  stages: { nodes: Stage[] };
  id: string;
  status: string;
  path: string;
  commit: Commit;
  createdAt: string;
}
export interface Stage {
  name: string;
  status: string;
}
export interface Commit {
  id: string;
  description: string;
  message: string;
  author: Author;
}

export interface Author {
  name: string;
  publicEmail: string;
}

export type GitlabResponse = {
  data: {
    projects: {
      count: number;
      nodes: Array<{
        id: string;
        name: string;
        pipelines: {
          nodes: Array<Pipeline>;
        };
      }>;
    };
  };
};
