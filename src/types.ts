export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  user: string;
  name: string;
  email: string;
}
