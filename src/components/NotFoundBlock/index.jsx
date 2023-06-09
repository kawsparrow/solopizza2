import React from "react";
import styles from "./NotFoundBlock.module.css";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😭</span>
        <br />
        გვერდი ვერ მოიძებნა :(
      </h1>
      <p className={styles.description}>
        სამწუხაროდ კონკრეტული გვერდი ვერ მოიძებნა ჩვენს ინტერნეტ-მაღაზიაში
      </p>
    </div>
  );
};

export default NotFoundBlock;
