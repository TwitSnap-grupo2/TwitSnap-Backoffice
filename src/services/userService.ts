import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginCredentials, SignupCredentials } from "../types";
import { auth } from "../firebase";
import axios from "axios";
import config from "../utils/config";
let token: string | null = null;

const setToken = (newToken: string): void => {
  console.log("🚀 ~ setToken ~ newToken:", newToken);
  token = `Bearer ${newToken}`;
};

const signup = async (credentials: SignupCredentials) => {
  console.log("🚀 ~ signup ~ credentials:", credentials);

  const firebaseResponse = await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
  const firebaseToken = await firebaseResponse.user.getIdToken();
  setToken(firebaseToken);

  const requestConfig = {
    headers: { Authorization: token },
  };

  const res = await axios.post(
    `${config.USERS_SERVICE_URL}/users/admin/signup`,
    credentials,
    requestConfig
  );

  console.log("🚀 ~ register response from api:", res);

  if (res.status != 201) {
    console.log("res.status: ", res.status);
    throw Error(`Error: ${res.data}`);
  }

  return res.data;
};

const login = async (credentials: LoginCredentials): Promise<void> => {
  console.log("🚀 ~ login ~ credentials:", credentials);

  const firebaseResponse = await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
  const firebaseToken = await firebaseResponse.user.getIdToken();

  setToken(firebaseToken);
};

const getLoggedUser = async () => {
  const auth = getAuth();
  await auth.authStateReady();

  const user = auth.currentUser;

  if (user) {
    const firebaseToken = await user.getIdToken();
    setToken(firebaseToken);
    return user;
  }
  return null;
};

export default { login, signup, getLoggedUser, setToken };
