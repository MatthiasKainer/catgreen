import express from "express";
import ViteExpress from "vite-express";
import session from "express-session"
import * as dotenv from "dotenv";
import pLimit  from 'p-limit';

dotenv.config();
const app = express();

declare module 'express-session' {
  interface SessionData {
      key: string;
  }
}

const limit = pLimit(5)

const client = (project: string) => {
  const f = (path: string) => <T>() : Promise<T> => fetch(`https://dev.azure.com/volocopter/${project}/_apis/${path}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(':' + process.env.PAT_TOKEN)
    },
    redirect: "follow"
  })
    .then(r => r.json())

  return {
    definitions: f("build/definitions"),
    builds: (definition: string) => f(`build/builds?definitions=${definition}&$top=1&api-version=6.0`)
  }
}

app.use((session({
  secret: process.env.SESSION_SECRET || "no secret",
  resave: false,
  saveUninitialized: true
})))
app.use(express.json());

type Definitions = {
  value: {id: string}[]
}
type Builds = {
  value: []
}

app.get("/o/:org/p/:project", async (req, res) => {
  if (!process.env.PAT_TOKEN) {
    res.status(401).send({ status: "NOAUTH" });
  } else {

    const { project } = req.params
    const api = client(project)
    const definitions = await api.definitions<Definitions>();

    res.json({ status: "OK", data: (await Promise.all(definitions.value.map(({id}) => limit(() => api.builds(id)<Builds>()))))
      .reduce((prev, curr) => [...prev, ...curr.value], []) })
  }
})


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
