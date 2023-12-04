export type BuildResult = "unknown" | "failed" | "success" | "running";

export type Build = {
  id: string;
  name: string;
  result: BuildResult;
  meta: {
    triggerReason: string;
    blame: string;
    link: string;
    when: string;
    timestamp: string;
  };
};
