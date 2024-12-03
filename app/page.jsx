import About from "./components/About";
import AIDish from "./components/AiDish";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import Schedular from "./components/Schedular";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <About />
        <br />
        <br />
        <br />
        <br />
        <br />
        <AIDish />
        <hr />
        <Schedular />
      </div>
    </>
  );
}
