import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.main}>
      <div className={styles.mainImg}>
        <img src="/images/AboutImg.png" alt="about" />
      </div>
      <div className={styles.mainText}>
        <h1>
          About <b>MEALMATE</b>
        </h1>
        <p>
          MealMate is your smart kitchen companion, transforming your
          ingredients into delicious recipes with just a click. Designed to
          simplify meal planning, it personalizes suggestions to match your
          pantry, saves time, and reduces food waste. Discover, cook, and
          enjoy—effortlessly!
        </p>
      </div>
    </div>
  );
};

export default About;
