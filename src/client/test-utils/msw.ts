import { http, HttpResponse, HttpResponseInit } from "msw";
import { setupServer } from "msw/node";
import response from "./response.json";

const createHandler = {
  get: (path: string, jsonResponse: Object, status?: HttpResponseInit) =>
    http.get(
      `${window.location.protocol}//${window.location.host}/${path}`,
      () => {
        return new HttpResponse(JSON.stringify(jsonResponse), status);
      },
    ),
};

export const initNonDefinedEnvHandlers = [
  createHandler.get("env-init/name", { status: "NOT FOUND" }, { status: 404 }),
  createHandler.get(
    "env-init/filter",
    { status: "NOT FOUND" },
    { status: 404 },
  ),
];
export const initDefinedEnvHandlers = [
  createHandler.get("env-init/name", {
    status: "OK",
    data: "gh:MatthiasKainer",
  }),
  createHandler.get("env-init/filter", {
    status: "OK",
    data: "meta.blame:Matthias Kainer",
  }),
];

export const statusHandlers = [
  createHandler.get("status/test", { status: "OK", data: [] }),
  createHandler.get("status/full", response),
  createHandler.get("status/bad", {
    status: "OK",
    data: [
      {
        id: "1",
        projectName: "working build project",
        result: "success",
        meta: {
          link: "https://example.com/url",
          triggerReason: "manual",
          blame: "John Connor",
          when: "2 years ago",
          timestamp: "1985-03-10T19:59:42.4904533Z",
        },
      },
      {
        id: "2",
        projectName: "failing build project",
        result: "failed",
        meta: {
          link: "https://example.com/url",
          triggerReason: "batchedCI",
          blame: "T1000",
          when: "1 year ago",
          timestamp: "1986-12-21T10:24:33.8153361Z",
        },
      },
    ],
  }),
  createHandler.get("status/err", { status: "Totally your fault", data: [] }),
  createHandler.get("status/", { status: "ERR", data: [] }),
];
export const setup = setupServer;
