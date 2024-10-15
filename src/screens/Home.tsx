import styles from "../styles/home.module.css";
import icon from "../assets/logos.png";
import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

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
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={icon} className={styles.homeImage} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>Your Gateway to Management.</h1>
        <div className="flex mt-5 gap-2">
          <button id="home-button" onClick={openRegister}>
            Get Started
          </button>
          <button id="home-button" onClick={openLogin}>
            Login
          </button>
        </div>
      </div>
      {isRegister && <Register setIsRegister={setIsRegister} />}
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </div>
  );
};

export default Home;
