export let token: string | null = null;

export const setToken = (newToken: string): void => {
  console.log("🚀 ~ setToken ~ newToken:", newToken);
  token = `Bearer ${newToken}`;
};
