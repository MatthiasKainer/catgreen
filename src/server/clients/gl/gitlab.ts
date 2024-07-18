import { Build, BuildResult } from "../../../domain/build";
import { getTimeAgo } from "../../utils/time";
import { GitlabResponse, Pipeline } from "./types";

const getCursor = (cursor: string | undefined) => (cursor ? `(after: "${cursor}")` : "");

const gitlabGraphqlClient = (options: RequestInit, cursor: string | undefined = undefined) => {
  const gitlabHost = process.env.GITLAB_HOST ?? "gitlab.com"
  options.body = ql`{
projects${getCursor(cursor)} {
    count
    pageInfo {
      endCursor
    }
    nodes {
      id
      name
      fullPath
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
}`;
  return async () =>{
    const data = await fetch(`https://${gitlabHost}/api/graphql`, options).then((r) => {
      if (r.status > 399) {
        throw new Error(`[gitlab][${gitlabHost}] Not-ok status code response: ${r.status}`);
      }
      return r;
    }).then(
      (response) => response.json() as Promise<GitlabResponse>,
    );
    if (data.data.projects.pageInfo.endCursor) {
      data.data.projects.nodes.push(...(await gitlabGraphqlClient(options, data.data.projects.pageInfo.endCursor)()).data.projects.nodes);
    }
    return data;
  }
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
    const gitlabHost = process.env.GITLAB_HOST ?? "gitlab.com"
    return {
      id: pipeline.id,
      name: project,
      result: mapStatus(pipeline.status),
      meta: {
        triggerReason: pipeline.commit?.message ?? "no commit",
        blame: pipeline.commit.author?.name ?? "unknown",
        timestamp: pipeline.createdAt,
        link: `https://${gitlabHost}${pipeline.path}`,
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
      }
    });

    const { data } = await graphqlWithAuth();

    return data.projects.nodes.filter(p => p.fullPath.includes(project)).reduce(
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
