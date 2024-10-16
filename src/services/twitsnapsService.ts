import axios from "axios";
import config from "../utils/config";
import { getAuth } from "firebase/auth";
import testTwits from "../data/twits";

const getAllTwitSnaps = async () => {
  // const auth = getAuth();
  // await auth.authStateReady();
  // const user = auth.currentUser;
  // const token = await user?.getIdToken();
  // console.log("🚀 ~ getAllTwitSnaps ~ token:", token);

  // const requestConfig = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  // const res = await axios.get(`${config.API_GATEWAY_URL}/twits`, requestConfig);
  // console.log("🚀 ~ getAllTwitSnaps ~ res:", res.data);

  // if (res.status != 200) {
  //   throw new Error("Error while fetching twitsnaps");
  // }
  // return res.data;
  return testTwits;
};

export default { getAllTwitSnaps };
