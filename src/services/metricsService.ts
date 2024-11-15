import axios from "axios";
import config from "../utils/config";
import { LoginData, PasswordRecoveryData, RegistrationData } from "../utils/data";

const registrationMetrics = async (from:Date , to: Date) => {
    console.log("🚀 ~ registrationMetrics ~ filter");

    const res: RegistrationData = await axios.get(`${config.API_GATEWAY_URL}/metrics/register?from=${from}&to=${to}`);

    return res;

}

const loginMetrics = async (from:Date , to: Date) => {
    console.log("🚀 ~ registrationMetrics ~ filter");

    const res: LoginData = await axios.get(`${config.API_GATEWAY_URL}/metrics/login?from=${from.toDateString()}&to=${to.toDateString()}`);

    return res;

}

const passwordRecoveryMetrics = async (from:Date , to: Date) => {
    console.log("🚀 ~ registrationMetrics ~ filter");

    const res: PasswordRecoveryData = await axios.get(`${config.API_GATEWAY_URL}/metrics/recoverPassword?from=${from}&to=${to}`);

    return res;

}

export { registrationMetrics, loginMetrics, passwordRecoveryMetrics };