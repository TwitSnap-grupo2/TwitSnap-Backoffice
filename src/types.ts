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
  createdBy: UserInfo;
}

export enum TwitSnapFilterBy {
  id = "id",
  createdAt = "createdAt",
  createdBy = "createdBy",
  creatorId = "creatorId",
  creatorUser = "creatorUser",
  creatorName = "creatorName",
  creatorEmail = "creatorEmail",
  message = "message",
}

export interface TwitSnapFilter {
  filterBy: TwitSnapFilterBy;
  filter: string;
}

export interface UserInfo {
  id: string;
  email: string;
  user: string;
  name: string;
  location?: string;
  interests?: Array<string>;
  goals?: Array<string>;
  followers?: Array<string>;
  followeds?: Array<string>;
  twitsnaps?: Array<string>;
  is_blocked: boolean;
}

export enum UserInfoFilterBy {
  id = "id",
  email = "email",
  user = "user",
  name = "name",
  location = "location",
  interests = "interests",
  goals = "goals",
  followers = "followers",
  followeds = "followeds",
  twitsnaps = "twitsnaps",
}

export interface UserInfoFilter {
  filterBy: UserInfoFilterBy;
  filter: string;
}

export interface MetricsFilter {
  from: string;
  to: string;
}
