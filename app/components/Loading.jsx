import React from "react";
import styles from "./Loading.module.css";

// Loading component (this shows whenever a page is loading)
const Loading = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Loading;
