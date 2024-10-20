export let token: string | null = null;

export const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};
