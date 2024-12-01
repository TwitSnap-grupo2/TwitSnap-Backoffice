import axios from "axios";
import config from "../utils/config";
import { getAuth } from "firebase/auth";
import { TwitSnap } from "../types";
import { HashtagMetrics, TwitsnapMetrics } from "../utils/data";

const getAllTwitSnaps = async (): Promise<Array<TwitSnap>> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(
    `${config.API_GATEWAY_URL}/twits/populated`,
    requestConfig
  );

  return res.data;
};

const blockTwit = async (twitId: string) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/twits/${twitId}/block`,
    undefined,
    requestConfig
  );

  if (res.status != 200) {
    throw new Error("Error while blocking twitsnap");
  }
  return res.data;
};

const unblockTwit = async (twitId: string) => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.patch(
    `${config.API_GATEWAY_URL}/twits/${twitId}/unblock`,
    undefined,
    requestConfig
  );

  if (res.status != 200) {
    throw new Error("Error while blocking twitsnap");
  }
  return res.data;
};



const getTwitSnapsMetrics = async (range: string): Promise<TwitsnapMetrics> => {
    const auth = getAuth();
    await auth.authStateReady();
    const user = auth.currentUser;
    const token = await user?.getIdToken();
  
    const requestConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
  const res = await axios.get<TwitsnapMetrics>(
    `${config.API_GATEWAY_URL}/twits/metrics?range=${range}`,
    requestConfig
  );

  return res.data;
}

const getHashtagMetrics = async (range: string, name: string): Promise<HashtagMetrics> => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if(name === ""){
    
  const res = await axios.get<HashtagMetrics>(
    `${config.API_GATEWAY_URL}/twits/metrics/hashtag?range=${range}`,
    requestConfig
  );
  return res.data
} else {
  const res = await axios.get<HashtagMetrics>(
    `${config.API_GATEWAY_URL}/twits/metrics/hashtag?range=${range}&name=${name}`,
    requestConfig
  );
  return res.data
}

}




export default { getAllTwitSnaps, blockTwit, unblockTwit, getTwitSnapsMetrics, getHashtagMetrics };
