import React from "react";
import styles from "./Loading.module.css";

// Loading component (this shows whenever a page is loading)
const Loading = (isSchedule) => {
  return (
    <>
      <div className={styles.overlay}>
        {isSchedule && (
          <p style={{ color: "white" }}>This might take a few seconds!</p>
        )}
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Loading;
