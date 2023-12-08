import { Build, BuildResult } from "../../../domain/build";
import { getTimeAgo } from "../../utils/time";
import { GitlabResponse, Pipeline } from "./types";

const gitlabGraphqlClient = (options: RequestInit) => {
  return async () =>
    await fetch("https://gitlab.com/api/graphql", options).then((r) => {
      if (r.status > 399) {
        throw new Error(`Not-ok status code response: ${r.status}`);
      }
      return r;
    });
};

const mapStatus = (status: string): BuildResult => {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "FAILED":
      return "failed";
    case "RUNNING":
    case "PENDING":
    case "WAITING_FOR_CALLBACK":
    case "WAITING_FOR_RESOURCE":
      return "running";
  }
  return "unknown";
};

const mapPipelineToBuild =
  (project: string) =>
  (pipeline: Pipeline): Build => {
    return {
      id: pipeline.id,
      name: project,
      result: mapStatus(pipeline.status),
      meta: {
        triggerReason: pipeline.commit?.message ?? "no commit",
        blame: pipeline.commit.author?.name ?? "unknown",
        timestamp: pipeline.createdAt,
        link: `https://gitlab.com${pipeline.path}`,
        when: getTimeAgo(pipeline.createdAt) ?? "now",
      },
    };
  };

function ql(strings: TemplateStringsArray, ...values: any[]) {
  return JSON.stringify({
    query: strings.reduce((result, string, i) => {
      const value = values[i] || "";
      return result + string + value;
    }, ""),
    variables: null,
  });
}

const authorization = () => ({
  authorization: `Bearer ${process.env.GITLAB_API_TOKEN}`,
});

export const client = (project: string) => {
  const load = async () => {
    const graphqlWithAuth = gitlabGraphqlClient({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authorization(),
      },
      body: ql`{
    projects(search: "${project}") {
        count
        nodes {
          id
          name
          
          pipelines(first: 1) {
            nodes {
              stages {
                nodes {
                  name
                  status
                }
              }
              id
              status
              path
              
              commit {
                id
                description
                message
                author {
                  name
                  publicEmail
                }
              }
              createdAt
            }
          }
        }
      }
    }`,
    });

    const { data } = await graphqlWithAuth().then(
      (response) => response.json() as Promise<GitlabResponse>,
    );

    return data.projects.nodes.reduce(
      (builds, project) => (
        builds.push(
          ...project.pipelines.nodes.map(mapPipelineToBuild(project.name)),
        ),
        builds
      ),
      [] as Build[],
    );
  };

  return { load };
};
