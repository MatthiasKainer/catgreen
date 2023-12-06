import path from "path";
import "express-async-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";
import { getApi } from "./clients";
import { yearsToMs } from "./utils/time";
import { PipelineUrl } from "./utils/protocol";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  "/assets",
  express.static(path.join(__dirname, "public"), { maxAge: yearsToMs(1) }),
);

app.get("/intl", (_, res) => {
  res.send({
    "filter-name": {
      label: "Add a list of pipeline sources",
      placeholder: "ado:org/project,gh:owner",
      tooltip: `Pipeline sources follow a specific convention:
  pipeline-provider:repos-reference

For the different providers, that leads to the following urls:
Azure DevOps: 
  ado:organization/project -> This will load all repos from the project
Github:
  gh:owner ->This will load all repos from the owner

You can combine multiple sources simply by writing them as a comma separated list.

  `,
    },
    "filter-results": {
      label: "Filter",
      placeholder: "name:catgreen,name:pure-lit,meta.blame:Matthias Kainer",
      tooltip: `To filter, add the filter statement in the form

  [field]:[query]

  possible fields are
  - id
  - name
  - result ("unknown" | "failed" | "success" | "running")
  - meta.triggerReason
  - meta.blame
  - link
  - timestamp

  `,
    },
    "filter-progress": "Show running builds",
  });
});

app.get("/env-init/:key", (req, res) => {
  const { key } = req.params;
  switch (key) {
    case "name":
      return process.env.CONFIG_NAME
        ? res.json({ status: "OK", data: process.env.CONFIG_NAME })
        : res.status(404).json({ status: "NOT FOUND" });
    case "filter":
      return process.env.CONFIG_FILTER
        ? res.json({ status: "OK", data: process.env.CONFIG_FILTER })
        : res.status(404).json({ status: "NOT FOUND" });
  }
  return res.status(404).json({ status: "NOT FOUND" });
});

app.get("/status/*", async (req, res) => {
  if (!process.env.AZURE_DEVOPS_PAT_TOKEN || !process.env.GITHUB_API_TOKEN) {
    res.status(401).send({ status: "NOAUTH" });
  } else if (req.path.replace("/status/", "") === "") {
    res.status(400).send({ status: "NO PIPELINE" });
  } else {
    const name = req.path.replace("/status/", "");
    const pipelineUrl = PipelineUrl.splitString(name);
    const pipelineProvider = getApi(pipelineUrl.protocol);
    if (!pipelineProvider) {
      res.send(404).json({ status: "PROVIDER NOT FOUND" });
    } else {
      const api = pipelineProvider.client(pipelineUrl.path);
      const data = await api.load();
      res.json({ status: "OK", data });
    }
  }
});

app.use((err: Error, _: Request, res: Response, _1: NextFunction) => {
  console.error(err);
  return res.status(500).json({
    status: "ERROR",
    message:
      "Something truly aweful has happened. I'm not going to tell you what, but lordy lou it's terrible!",
  });
});

const port = parseInt(process.env.PORT ?? "3000", 10);
ViteExpress.listen(app, port, () =>
  console.log(
    `Server is listening on port ${port}... Open http://localhost:${port} to see for yourself`,
  ),
);
