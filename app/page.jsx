import AIDish from "./components/AiDish";
import Navbar from "./components/navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <AIDish />
      </div>
    </>
  );
}
