import path from "path"
import 'express-async-errors';
import express from "express";
import { Request, Response, NextFunction } from 'express';
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";
import { getApi } from "./clients";
import { yearsToMs } from "./utils/time";
import { PipelineUrl } from "./utils/protocol";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public"), { maxAge: yearsToMs(1) }));

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

  `
    },
    "filter-progress": "Show running builds",
  })
})

app.get("/status/*", async (req, res) => {
  if (!process.env.PAT_TOKEN) {
    res.status(401).send({ status: "NOAUTH" });
  } else {
    const name = req.path.replace("/status/", "")
    const pipelineUrl = PipelineUrl.splitString(name)
    const pipelineProvider = getApi(pipelineUrl.protocol)
    const api = pipelineProvider.client(pipelineUrl.path)
    const data = await api.load()
    res.json({ status: "OK", data })
  }
})

app.use((err: Error, _: Request, res: Response, _1: NextFunction) => {
  console.error(err)
  return res.status(500).json({ status: "ERROR", message: "Something truly aweful has happened. I'm not going to tell you what, but lordy lou it's terrible!" })
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
