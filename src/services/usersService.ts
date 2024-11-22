import axios from "axios";
import config from "../utils/config";
import { getAuth } from "firebase/auth";
// import testUsers from "../data/twits";

const getAllUsers = async () => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${config.API_GATEWAY_URL}/users`, requestConfig);

  if (res.status != 200) {
    throw new Error("Error while fetching users");
  }
  return res.data;
  //   return testUsers;
};

const blockUser = async (userId: string) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/users/block/${userId}`,
    undefined,
    requestConfig
  );

  if (res.status != 200) {
    throw new Error("Error while blocking user");
  }
  return res.data;
};

const unBlockUser = async (userId: string) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/users/unblock/${userId}`,
    undefined,
    requestConfig
  );

  if (res.status != 200) {
    throw new Error("Error while unblocking user");
  }
  return res.data;
};

export default { getAllUsers, blockUser, unBlockUser };
