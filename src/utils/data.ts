export type LocationData = {
  location: string;
  res: number;
};

export type RegistrationData = {
  totalSuccess: number | null;
  successRate: number;
  averageRegistrationTime: number;
  locationCount: LocationData[];
  emailCount: number;
  googleCount: number;
};


export type LoginData = {
  totalSuccess: number | null;
  successRate: number;
  averageLoginTime: number;
  locationCount: LocationData[];
  emailCount: number;
  googleCount: number;
};



export type PasswordRecoveryData = {
  total: number | null;
  successRate: number;
  averageRecoverPasswordTime: number;
};

export type TwitsnapMetrics = {
  total: number | null;
  frequency: Array<{
    date: string;
    count: number;
  }>;
  averageTwitsPerUser: number;
  topLikedTwits: Array<{
    count: number;
    id: string;
    message: string | null;
    isBlocked: boolean;
    createdBy: string;
    createdAt: string;
  }>;
  topSharedTwits: Array<{
    count: number;
    id: string;
    message: string | null;
    isBlocked: boolean;
    createdBy: string;
    createdAt: string;
  }>;
}

export type HashtagMetrics = {
  total: number | null;
  frequency: Array<{
    date: string;
    count: number;
  }>;
  topHashtags: Array<{
    count: number;
    name: string;
  }>;
}