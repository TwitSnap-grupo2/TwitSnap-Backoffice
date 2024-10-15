import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
  useEffect(() => {
    // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
    auth.authStateReady().then(() => {
      const user = auth.currentUser;
      if (!user) {
        return navigate("/");
      }
    });
  });

  const onLogOut = async () => {
    console.log("Logging out...");
    await auth.signOut();
    return navigate("/");
  };

  return (
    <div className="">
      <div className="bg-slate-700 flex justify-between px-5 py-4">
        <div className="inline-block align-middle">
          <p className="">Hello again, admin</p>
        </div>
        <button onClick={onLogOut}>Log out</button>
      </div>
      <div className="bg-black w-1/5 h-screen flex flex-col ">
        <div className="flex flex-col items-start">
          <button className="w-full pl-2 py-4 transition ease-in-out delay-150 hover:-translate-y-1  hover:bg-slate-500 duration-300">
            See twits
          </button>
          <button className="w-full pl-2 py-4 transition ease-in-out delay-150 hover:-translate-y-1  hover:bg-slate-500 duration-300">
            See users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
