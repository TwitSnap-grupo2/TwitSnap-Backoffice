import React from "react";
import useAuth from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <h1>You need to log in to access the dashboard.</h1>;
  }

  return (
    <div>
      {/* <h1>Welcome, {user.name}!</h1> */}
      <p>You are logged in.</p>
    </div>
  );
};

export default Dashboard;
