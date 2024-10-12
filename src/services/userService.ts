import { Credentials, User } from "../types";

const login = async (credentials: Credentials): Promise<User | null> => {
  if (
    credentials.email == "a@a.com" &&
    credentials.password == "testpassword"
  ) {
    return {
      user: "test user",
      name: "test name",
      email: "test name",
    };
  }
  return null;
};

export default { login };
