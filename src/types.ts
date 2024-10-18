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

export interface TwitSnap {
  message: string;
  id: string;
  createdAt: Date;
  createdBy: string;
}

export enum TwitSnapFilterBy {
  id = "id",
  createdAt = "createdAt",
  createdBy = "createdBy",
  message = "message",
}

export interface TwitSnapFilter {
  filterBy: TwitSnapFilterBy;
  filter: string;
}
