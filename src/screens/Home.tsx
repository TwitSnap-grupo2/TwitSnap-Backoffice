import styles from "../styles/home.module.css";
import icon from "../assets/logos.png";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import userService from "../services/loginService";
import { Box, Button } from "@mui/material";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    userService.getLoggedUser().then((user) => {
      if (user) {
        navigate("/dashboard");
      } else {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return (
      <div className="h-full flex flex-1 justify-center  items-center">
        <h1 className="">Loading...</h1>
      </div>
    );
  }

  const openLogin = async () => {
    setIsLogin(true);
  };

  return (
    <Box className="bg-homeColor grid grid-cols-2 min-h-screen">
      <Box>
        <img src={icon} className={styles.homeImage} />
      </Box>
      <Box className={styles.textContainer}>
        <h1 className={styles.text}>Your Gateway to Management.</h1>
        <Box className="flex justify-center w-full mt-5 gap-2">
          <Button
            variant="contained"
            sx={{ bgcolor: "#112334", color: "white", px: 6, py: 2 }}
            onClick={openLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </Box>
  );
};

export default Home;
