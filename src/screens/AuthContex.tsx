import { useMutation, useQuery, useQueryClient } from "react-query";
import { Credentials, User } from "../types";
import { ReactNode } from "react";
import loginService from "../services/userService";
import { AuthContext } from "../hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  // Query to get the authentication status
  const { data: user } = useQuery<User | null>(
    "authStatus",
    async () => {
      // Simulate checking authentication status from local storage or an API
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    },
    {
      initialData: null,
    }
  );

  // Mutation to perform the login
  const loginMutation = useMutation(
    async (credentials: Credentials) => {
      const loggedInUser = await loginService.login(credentials);
      if (loggedInUser) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return loggedInUser;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("authStatus", data);
      },
    }
  );

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("user");
    queryClient.setQueryData("authStatus", null);
  };

  const login = async (credentials: Credentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user: user ?? null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
