import About from "./components/About";
import AIDish from "./components/AiDish";
import Footer from "./components/Footer";
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
        <Footer />
      </div>
    </>
  );
}
