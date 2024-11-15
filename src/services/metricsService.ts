import axios from "axios";
import config from "../utils/config";
import {
  LoginData,
  PasswordRecoveryData,
  RegistrationData,
} from "../utils/data";
import { getAuth } from "firebase/auth";

const registrationMetrics = async (from: Date, to: Date) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get<RegistrationData>(
    `${
      config.API_GATEWAY_URL
    }/metrics/register?date_from=${from.toISOString()}&date_to=${to.toISOString()}`,
    requestConfig
  );

  return res.data;
};

const loginMetrics = async (from: Date, to: Date) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get<LoginData>(
    `${
      config.API_GATEWAY_URL
    }/metrics/login?date_from=${from.toISOString()}&date_to=${to.toISOString()}`,
    requestConfig
  );

  return res.data;
};

const passwordRecoveryMetrics = async (from: Date, to: Date) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get<PasswordRecoveryData>(
    `${
      config.API_GATEWAY_URL
    }/metrics/recoverPassword?date_from=${from.toISOString()}&date_to=${to.toISOString()}`,
    requestConfig
  );

  return res.data;
};

export { registrationMetrics, loginMetrics, passwordRecoveryMetrics };
