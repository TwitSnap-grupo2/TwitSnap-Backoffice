import styles from '../styles/home.module.css';
import icon from '../assets/logos.png';
import logo from '../assets/logo.png';
import { useState } from 'react';
const Home = () => {

  const [isLogin, setIsLogin] = useState(false);

  const openLogin = () => {
    setIsLogin(true);
  }

  const closeLogin = () => {
    setIsLogin(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={icon} className={styles.homeImage} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>Your Gateway to Management.</h1>
        <button className={styles.button} onClick={openLogin}>Get Started</button>
      </div>
      {isLogin && <Login />}
    </div>
  );
};


const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={logo} className={styles.logoImage} />
        </div> 
    </div>
  )
}


export default Home;