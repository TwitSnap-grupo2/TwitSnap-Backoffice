import { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  signup: (credentials: SignupCredentials) => Promise<UserCredential>;
  login: (credentials: LoginCredentials) => Promise<UserCredential>;
  logout: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

// export interface User {
//   email: string;
// }
