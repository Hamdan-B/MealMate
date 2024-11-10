import AIDish from "./components/AiDish";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <div className={styles.navbar}>
          <h1 className={styles.logo}>MealMate</h1>
          <ul>
            <li>Home</li>
            <li>Schedular</li>
            <li>Other</li>
            <li>Other</li>
          </ul>
        </div>
        <AIDish />
      </div>
    </>
  );
}
