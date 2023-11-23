import { Build, BuildResult } from "../../../domain/build";
import { getTimeAgo } from "../../utils/time";
import { AzureDevOpsDefinitions, AzureDevOpsBuilds, AzureDevOpsBuildResults } from "./type";
import pLimit from 'p-limit';

const limit = pLimit(5)

export const client = (name: string) => {
  const f = (path: string) => <T>(): Promise<T> => fetch(`https://dev.azure.com/${name}/_apis/${path}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(':' + process.env.PAT_TOKEN)
    },
    redirect: "follow"
  })
    .then(r => r.json())

  const definitions = f("build/definitions");
  const builds = (definition: string) => f(`build/builds?definitions=${definition}&api-version=6.0`);

  const load = async () => {
    const definitionResults = await definitions<AzureDevOpsDefinitions>();

    if (!definitionResults.value) {
      throw new Error("No definitions")
    }

    const buildResults = (await Promise.all(definitionResults.value.map(({ id }) => limit(() => builds(id)<AzureDevOpsBuildResults>()))))
      .reduce((prev, curr) => [...prev, curr.value?.[0]], [] as AzureDevOpsBuilds[])
      .filter(definition => definition !== undefined)

    const mapResult = (result: string, status: string): BuildResult => {

      switch (result) {
        case "failed":
          return "failed"
        case "succeeded":
          return "success"
      }
      return (status === "inProgress") ? "running" : "unknown"
    }

    return buildResults.map<Build>(build => ({
      id: build.id.toString(),
      projectName: build.definition.name,
      result: mapResult(build.result, build.status),
      meta: {
        link: build._links.web.href,
        triggerReason: build.triggerInfo["pr.title"] ?? build.reason,
        blame: build.triggerInfo["pr.sender.name"] ?? build.requestedFor.displayName,
        when: getTimeAgo(build.finishTime) ?? "now",
        timestamp: build.finishTime
      }
    }))
  }

  return {
    load,
  }
}
export const text = {
  "filter-name": {
    label: "Commaseparated list of Organizations and Projects:",
    placeholder: ""
  },
  "filter-progress": "Show running builds",
}