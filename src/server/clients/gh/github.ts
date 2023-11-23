import { Build, BuildResult } from "../../../domain/build";
import { getTimeAgo } from "../../utils/time";
import { GithubCheckSuite, GithubRepositories, GithubRepository } from "./type";
import { graphql } from "@octokit/graphql";

const authorization = () => ({ authorization: `token ${process.env.GH_TOKEN}` })

export const client = (org: string) => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      ...authorization()
    },
  });

  const load = async () => {
    const { repositoryOwner } = await graphqlWithAuth<GithubRepositories>(`
    {
      repositoryOwner(login: "${org}") {
        repositories(first: 50, isFork: false) {
          nodes {
            name
            defaultBranchRef {
              name
              target {
                ... on Commit {
                  history(first: 1) {
                    edges {
                      node {
                        oid
                        messageHeadline
                        author {
                          name
                        }
                        checkSuites(first: 50) {
                          nodes {
                            __typename
                            createdAt
                            status
                            conclusion
                            workflowRun {
                              workflow {
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
      `);


    const mapResult = (result: string, status: string): BuildResult => {

      switch (result.toLowerCase()) {
        case "failure":
        case "timed_out":
          return "failed"
        case "success":
          return "success"
      }
      return (status.toLowerCase() !== "completed") ? "running" : "unknown"
    }

    const compareResults = (oldResult: BuildResult, newResult: BuildResult) => {
      return (newResult === "failed" || "running") ? newResult : oldResult
    }

    const updateTimestamp = (build: Build, createdAt: string) => 
      (build.meta.timestamp > createdAt) ? { timestamp: build.meta.timestamp, when: build.meta.when } : { timestamp: createdAt, when: getTimeAgo(createdAt) };
    

    const buildResult = (build: Build, commit: GithubCheckSuite): Build => ({
      ...build,
      result: compareResults(build.result, mapResult(commit.conclusion ?? "unknown", commit.status)),
      ...updateTimestamp(build, commit.createdAt)
    })
    
    const toBuild = (repository: GithubRepository): Build | null => {
      const lastCommit = repository.defaultBranchRef.target.history.edges?.[0].node
      if (!lastCommit) return null

      const checks = lastCommit.checkSuites.nodes.filter(check => !!check.workflowRun)
      
      if (checks.length < 1) return null

      const [firstRun, ...rest] = checks

      const result: Build = {
        id: "",
        projectName: repository.name,
        result: mapResult(firstRun.conclusion ?? "unknown", firstRun.status),
        meta: {
          link: `https://github.com/${org}/${repository.name}/actions`,
          triggerReason: lastCommit.messageHeadline,
          blame: lastCommit.author.name,
          when: getTimeAgo(firstRun.createdAt) ?? "now",
          timestamp: firstRun.createdAt
        }
      }
      return rest.reduce((result, next) => ({
        ...buildResult(result, next)
      }), result)
    }

    const buildResults = repositoryOwner.repositories.nodes.map(toBuild)

    return buildResults.filter((build) : build is Build => build !== null)
  }

  return {
    load,
  }
}
export const text = {
  "filter-name": {
    label: "Add a company separated list of owners",
    placeholder: "owner1, owner2"
  },
  "filter-progress": "Show running builds",
}