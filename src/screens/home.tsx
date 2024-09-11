import styles from '../styles/home.module.css';
import icon from '../assets/logos.png';
const Home = () => {
    return (
        <div>
            <h1 className={styles.text}>Your Gateway to Management.</h1>
            <img src={icon} className={styles.image} />
        </div>
);
};

export default Home;