// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./utils/config";

const firebaseConfig = config.FIREBASE_CONFIG;
console.log("🚀 ~ firebaseConfig:", firebaseConfig);
// const firebaseConfig = {
//   apiKey: "AIzaSyAs-upM23kIZ0IwMYKIlNI6YyByQhplxYE",

//   authDomain: "twitsnap-43ee3.firebaseapp.com",

//   databaseURL: "https://twitsnap-43ee3-default-rtdb.firebaseio.com",

//   projectId: "twitsnap-43ee3",

//   storageBucket: "twitsnap-43ee3.appspot.com",

//   messagingSenderId: "51208642510",

//   appId: "1:51208642510:web:ff705fad1b8992c009559f",

//   measurementId: "G-G1SLT1D2GF",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
