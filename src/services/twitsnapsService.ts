import axios from "axios";
import config from "../utils/config";
import { getAuth } from "firebase/auth";
import { TwitSnap } from "../types";

const getAllTwitSnaps = async (): Promise<Array<TwitSnap>> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${config.API_GATEWAY_URL}/twits`, requestConfig);

  if (res.status != 200) {
    throw new Error("Error while fetching twitsnaps");
  }
  return res.data;
};

export default { getAllTwitSnaps };
