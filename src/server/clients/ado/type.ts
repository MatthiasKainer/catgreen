export type AzureDevOpsDefinitions = {
  value: { id: string }[];
};
export type AzureDevOpsBuildResults = {
  value: AzureDevOpsBuilds[];
};

export interface AzureDevOpsBuilds {
  _links: Links;
  properties: Properties;
  tags: any[];
  validationResults: any[];
  plans: Plan[];
  triggerInfo: TriggerInfo;
  id: number;
  buildNumber: string;
  status: string;
  result: string;
  queueTime: string;
  startTime: string;
  finishTime: string;
  url: string;
  definition: Definition;
  buildNumberRevision: number;
  project: Project2;
  uri: string;
  sourceBranch: string;
  sourceVersion: string;
  queue: Queue;
  priority: string;
  reason: string;
  requestedFor: RequestedFor;
  requestedBy: RequestedBy;
  lastChangedDate: string;
  lastChangedBy: LastChangedBy;
  parameters: string;
  orchestrationPlan: OrchestrationPlan;
  logs: Logs;
  repository: Repository;
  retainedByRelease: boolean;
  triggeredByBuild: any;
  appendCommitMessageToRunName: boolean;
}

export interface Links {
  self: Self;
  web: Web;
  sourceVersionDisplayUri: SourceVersionDisplayUri;
  timeline: Timeline;
  badge: Badge;
}

export interface Self {
  href: string;
}

export interface Web {
  href: string;
}

export interface SourceVersionDisplayUri {
  href: string;
}

export interface Timeline {
  href: string;
}

export interface Badge {
  href: string;
}

export interface Properties {}

export interface Plan {
  planId: string;
}

export interface TriggerInfo {
  "pr.sourceBranch": string;
  "pr.sourceSha": string;
  "pr.id": string;
  "pr.title": string;
  "pr.number": string;
  "pr.isFork": string;
  "pr.draft": string;
  "pr.sender.name": string;
  "pr.sender.avatarUrl": string;
  "pr.sender.isExternal": string;
  "pr.providerId": string;
  "pr.autoCancel": string;
}

export interface Definition {
  drafts: any[];
  id: number;
  name: string;
  url: string;
  uri: string;
  path: string;
  type: string;
  queueStatus: string;
  revision: number;
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
  lastUpdateTime: string;
}

export interface Project2 {
  id: string;
  name: string;
  description: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
  lastUpdateTime: string;
}

export interface Queue {
  id: number;
  name: string;
  pool: Pool;
}

export interface Pool {
  id: number;
  name: string;
  isHosted: boolean;
}

export interface RequestedFor {
  displayName: string;
  url: string;
  _links: Links2;
  id: string;
  uniqueName: string;
  imageUrl: string;
  descriptor: string;
}

export interface Links2 {
  avatar: Avatar;
}

export interface Avatar {
  href: string;
}

export interface RequestedBy {
  displayName: string;
  url: string;
  _links: Links3;
  id: string;
  uniqueName: string;
  imageUrl: string;
  descriptor: string;
}

export interface Links3 {
  avatar: Avatar2;
}

export interface Avatar2 {
  href: string;
}

export interface LastChangedBy {
  displayName: string;
  url: string;
  _links: Links4;
  id: string;
  uniqueName: string;
  imageUrl: string;
  descriptor: string;
}

export interface Links4 {
  avatar: Avatar3;
}

export interface Avatar3 {
  href: string;
}

export interface OrchestrationPlan {
  planId: string;
}

export interface Logs {
  id: number;
  type: string;
  url: string;
}

export interface Repository {
  id: string;
  type: string;
  clean: any;
  checkoutSubmodules: boolean;
}
