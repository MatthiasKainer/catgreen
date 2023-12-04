export const PipelineUrl = {
  splitString: (input: string): { protocol: string; path: string } => {
    const parts = input.split(":");
    if (parts.length === 1) {
      return { protocol: "", path: input };
    }
    const [protocol, path] = parts;
    return { protocol, path };
  },
};
