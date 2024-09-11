import styles from '../styles/home.module.css';
import icon from '../assets/logos.png';
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={icon} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>Your Gateway to Management.</h1>
        <button className={styles.button}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;