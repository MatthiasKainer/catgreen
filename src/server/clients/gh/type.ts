export type GithubRepositories = {
  repositoryOwner: {
    repositories: {
      nodes: Array<GithubRepository>;
    };
  };
};

export type GithubRepository = {
  name: string;
  defaultBranchRef: {
    name: string;
    target: {
      history: {
        edges: Array<{
          node: GithubHistory;
        }>;
      };
    };
  };
};

export type GithubHistory = {
  oid: string;
  messageHeadline: string;
  author: {
    name: string;
  };
  checkSuites: {
    nodes: Array<GithubCheckSuite>;
  };
};

export type GithubCheckSuite = {
  __typename: string;
  createdAt: string;
  status: string;
  conclusion?: string;
  workflowRun?: {
    workflow: {
      name: string;
    };
  };
};
