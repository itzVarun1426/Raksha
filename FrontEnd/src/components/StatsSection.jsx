import ndrfImg from "../assets/ndrfImg.jpg";
import styles from "./StatsSection.module.css";

function StatsSection() {
  return (
    <>
      <div className={styles.page3}>
        <div className={styles.imageSection}>
          <img src={ndrfImg} alt="Rescue Operations" />
        </div>
        <div className={styles.statsSection}>
          {[
            { number: "1000+", text: "Lives saved and reestablished" },
            { number: "20000+", text: "Successful Rescued operations" },
            { number: "3000+", text: "Missions accomplished successfully" },
          ].map((stat, index) => (
            <div key={index} className={styles.stat}>
              <h2>{stat.number}</h2>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StatsSection;
