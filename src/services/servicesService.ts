import axios from "axios";
import { getAuth } from "firebase/auth";
import { NewService, Service } from "../types";
import config from "../utils/config";

const getAllServices = async (): Promise<Array<Service>> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(
    `${config.API_GATEWAY_URL}/services`,
    requestConfig
  );

  return res.data;
};

const createNewService = async (newService: NewService): Promise<Service> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(
    `${config.API_GATEWAY_URL}/services`,
    newService,
    requestConfig
  );

  return res.data;
};

const blockService = async (serviceId: string): Promise<Service> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/services/${serviceId}/block`,
    undefined,
    requestConfig
  );

  return res.data;
};

const unblockService = async (serviceId: string): Promise<Service> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/services/${serviceId}`,
    undefined,
    requestConfig
  );

  return res.data;
};

export default {
  getAllServices,
  createNewService,
  blockService,
  unblockService,
};
