export type LocationData = {
  location: string;
  res: number;
};

type RegistrationData = {
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
