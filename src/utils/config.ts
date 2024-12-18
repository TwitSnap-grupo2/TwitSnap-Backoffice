const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementIdauthDo: import.meta.env.VITE_MEASUREMENT_ID,
};

const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

export default { FIREBASE_CONFIG, API_GATEWAY_URL };
