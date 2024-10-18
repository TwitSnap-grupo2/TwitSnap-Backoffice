import axios from "axios";
import config from "../utils/config";
import { getAuth } from "firebase/auth";
// import testUsers from "../data/twits";

const getAllUsers = async () => {
  const auth = getAuth();
  await auth.authStateReady();
  const user = auth.currentUser;
  const token = await user?.getIdToken();
  console.log("🚀 ~ getAllUsers ~ token:", token);

  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${config.API_GATEWAY_URL}/users`, requestConfig);
  console.log("🚀 ~ getAllUsers ~ res:", res.data);

  if (res.status != 200) {
    throw new Error("Error while fetching twitsnaps");
  }
  return res.data;
  //   return testUsers;
};

export default { getAllUsers };
