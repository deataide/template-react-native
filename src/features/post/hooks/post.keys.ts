export const postKeys = {
  all: ["posts"] as const,
  detail: (id: string) => [...postKeys.all, id] as const,
};
