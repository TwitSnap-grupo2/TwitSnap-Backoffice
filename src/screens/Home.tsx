import styles from "../styles/home.module.css";
import icon from "../assets/logos.png";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Home = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openRegister = () => {
    setIsRegister(true);
  };
  const openLogin = () => {
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
          <button className={styles.button} onClick={openRegister}>
            Get Started
          </button>
          <button className={styles.button} onClick={openLogin}>
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
