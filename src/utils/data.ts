export type LocationData = {
  location: string;
  res: number;
};

export type RegistrationData = {
  totalSuccess: number;
  successRate: number;
  averageRegistrationTime: number;
  locationCount: LocationData[];
  emailCount: number;
  googleCount: number;
};

export const registrationData: RegistrationData = {
  totalSuccess: 150,
  successRate: 0.85,
  averageRegistrationTime: 5.2,
  locationCount: [
    { location: "ARG", res: 25 },
    { location: "USA", res: 20 },
    { location: "AUS", res: 60 },
  ],
  emailCount: 100,
  googleCount: 50,
};

export type LoginData = {
  totalSuccess: number;
  successRate: number;
  averageLoginTime: number;
  locationCount: LocationData[];
  emailCount: number;
  googleCount: number;
};

export const loginData: LoginData = {
  totalSuccess: 300,
  successRate: 0.6434,
  averageLoginTime: 2.1,
  locationCount: [
    { location: "ARG", res: 25 },
    { location: "USA", res: 20 },
    { location: "AUS", res: 60 },
  ],
  emailCount: 200,
  googleCount: 100,
};

export type PasswordRecoveryData = {
  totalSuccess: number;
  successRate: number;
  averageRecoverPasswordTime: number;
};

export const passwordRecoveryData: PasswordRecoveryData = {
  totalSuccess: 53,
  successRate: 0.94,
  averageRecoverPasswordTime: 1.3,
};
