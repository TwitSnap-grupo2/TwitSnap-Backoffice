import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import twitsnapsService from "../services/twitsnapsService";
// import { TwitSnap } from "../types";
import TwitSnaps from "./TwitSnaps";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showTwits, setShowTwits] = useState(false);
  // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
  useEffect(() => {
    // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
    auth.authStateReady().then(() => {
      const user = auth.currentUser;
      if (!user) {
        <h1>Hello</h1>;
        return navigate("/");
      }
    });
  });

  const onLogOut = async () => {
    console.log("Logging out...");
    await auth.signOut();
    return navigate("/");
  };

  const onSeeTwits = () => {
    setShowTwits(true);
  };

  return (
    <div className="">
      <div className="bg-slate-700 flex justify-between px-5 py-4">
        <div className="inline-block align-middle">
          <p className="">Welcome back!</p>
        </div>
        <button onClick={onLogOut}>Log out</button>
      </div>
      <div className="flex">
        <div className="bg-black w-1/5 h-screen flex flex-col ">
          <div className="flex flex-col items-start">
            <button
              onClick={onSeeTwits}
              className="w-full pl-2 py-4 transition ease-in-out hover:bg-slate-500 duration-300"
            >
              See twits
            </button>
            <button className="w-full pl-2 py-4 transition ease-in-out hover:bg-slate-500 duration-300">
              See users
            </button>
          </div>
        </div>
        <div className="bg-red w-4/5 h-full px-10">
          {showTwits && <TwitSnaps />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
