import styles from "./ConceptSection.module.css";

function ConceptSection() {
  return (
    <>
      <div className={styles.page4}>
        <div className={styles.infoBox}>
          <h2>What we do? 🤔</h2>
          <p>
            The disaster management platform focuses on providing efficient
            solutions for planning, responding to, and recovering from various
            natural and man-made disasters. The system integrates real-time data
            monitoring, resource allocation, and communication tools to enhance
            decision-making and response coordination during emergencies.
          </p>
        </div>
        <div className={styles.conceptSection}>
          {[
            {
              title: "Concept of Alerts",
              description:
                "The disaster management platform features a real-time emergency alert system that warns individuals in danger zones through phone vibration and SMS notifications. By using their phone numbers, the system ensures timely alerts, enabling quick action and increasing safety during emergencies.",
            },
            {
              title: "Concept of Missing",
              description:
                "The platform includes a missing person reporting feature that allows users to report missing individuals during disaster incidents. This function enables users to submit details, photos, and last known locations, helping authorities and responders coordinate search and rescue efforts effectively during emergencies.",
            },
          ].map((concept, index) => (
            <div key={index} className={styles.concept}>
              <div className={styles.conceptTitle}>{concept.title}</div>
              <p>{concept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ConceptSection;
