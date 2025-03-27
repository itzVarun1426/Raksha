import React from "react";
import styles from "./NewsBox.module.css";

const NewsBox = ({ news }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={news.urlToImage} alt="image of disaster" />
      </div>
      <div className={styles.cardTitle}>{news.title}</div>
      {/* <div className={styles.cardContent}>{news.content}</div> */}
      <button className={styles.cardButton}>
        <a href={news.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </button>
    </div>
  );
};

export default NewsBox;
