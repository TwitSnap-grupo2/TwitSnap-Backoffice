import styles from "../styles/home.module.css";
import icon from "../assets/logos.png";
import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import userService from "../services/loginService";
import { Box, Button } from "@mui/material";

const Home = () => {
  const [isRegister, setIsRegister] = useState(false);
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

  const openRegister = () => {
    setIsRegister(true);
  };
  const openLogin = async () => {
    setIsLogin(true);
  };

  return (
    <Box className={styles.container}>
      {/* <div className={styles.imageContainer}> */}
      <Box>
        <img src={icon} className={styles.homeImage} />
      </Box>
      {/* </div> */}
      <Box className={styles.textContainer}>
        <h1 className={styles.text}>Your Gateway to Management.</h1>
        <Box className="flex mt-5 gap-2">
          <Button
            sx={{ bgcolor: "#112334", color: "white" }}
            onClick={openRegister}
          >
            Get Started
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#112334", color: "white" }}
            onClick={openLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
      {isRegister && <Register setIsRegister={setIsRegister} />}
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </Box>
  );
};

export default Home;
