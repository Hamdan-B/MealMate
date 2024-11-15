import AIDish from "./components/AiDish";
import Navbar from "./components/navbar";
import Schedular from "./components/Schedular";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <AIDish />
        <hr />
        <Schedular />
      </div>
    </>
  );
}
