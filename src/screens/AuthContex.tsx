import { LoginCredentials, SignupCredentials } from "../types";
import { ReactNode } from "react";
import loginService from "../services/userService";
import { AuthContext } from "../hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const logout = () => {
    console.log("🚀 ~ logout ~ logout:");
    localStorage.removeItem("user");
  };

  const login = async (credentials: LoginCredentials) =>
    loginService.login(credentials);
  const signup = async (credentials: SignupCredentials) =>
    await loginService.signup(credentials);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: false, user: null, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
