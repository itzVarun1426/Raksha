// import shelter from "../assets/shelter.png";
// import find from "../assets/find.png";
// import gov from "../assets/gov.png";
// import styles from "./UserButtons.module.css";

// function UserButtons() {
//   return (
//     <div className={styles.UserButtonsContainer}>
//       <div className={styles.UserButtonsContent}>
//         <div className={styles.UserButtonsContentUp}>
//           <div className={styles.ContentUpBox}>
//             <div className={styles.ContentUpBoxButtons}>
//               <button className={styles.UserButtons}>
//                 <img src={shelter} alt="shelter" />
//                 <div className={styles.UserButtonsText}>Safe Shelter</div>
//               </button>
//               <button className={styles.UserButtons}>
//                 <img src={find} alt="find" />
//                 <div className={styles.UserButtonsText}>Find Missing</div>
//               </button>
//               <button className={styles.UserButtons}>
//                 <img src={gov} alt="Gove" />
//                 <div className={styles.UserButtonsText}>Goverment</div>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.UserButtonsContentDown}>
//             <div className={styles.ContentDownBox}>
//                 <div className={styles.ContentDownBoxHeading}>-- Alerts --</div>
//                 <div className={styles.ContentDownBoxAlerts}></div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default UserButtons;


// import { useState, useEffect } from "react";
// import shelter from "../assets/shelter.png";
// import find from "../assets/find.png";
// import gov from "../assets/gov.png";
// import styles from "./UserButtons.module.css";

// function UserButtons() {
//   const [alerts, setAlerts] = useState([]);

//   // Fetch alerts from the backend
//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/alerts");
//         if (response.ok) {
//           const data = await response.json();
//           setAlerts(data);
//         } else {
//           console.error("Failed to fetch alerts");
//         }
//       } catch (error) {
//         console.error("Error fetching alerts:", error);
//       }
//     };

//     fetchAlerts();
//   }, []);

//   return (
//     <div className={styles.UserButtonsContainer}>
//       <div className={styles.UserButtonsContent}>
//         <div className={styles.UserButtonsContentUp}>
//           <div className={styles.ContentUpBox}>
//             <div className={styles.ContentUpBoxButtons}>
//               <button className={styles.UserButtons}>
//                 <img src={shelter} alt="shelter" />
//                 <div className={styles.UserButtonsText}>Safe Shelter</div>
//               </button>
//               <button className={styles.UserButtons}>
//                 <img src={find} alt="find" />
//                 <div className={styles.UserButtonsText}>Find Missing</div>
//               </button>
//               <button className={styles.UserButtons}>
//                 <img src={gov} alt="Government" />
//                 <div className={styles.UserButtonsText}>Government</div>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.UserButtonsContentDown}>
//           <div className={styles.ContentDownBox}>
//             <div className={styles.ContentDownBoxHeading}>-- Alerts --</div>
//             <div className={styles.ContentDownBoxAlerts}>
//               {alerts.length > 0 ? (
//                 alerts.map((alert, index) => (
//                   <div key={index} className={styles.AlertItem}>
//                     <p><strong>Type:</strong> {alert.type}</p>
//                     <p><strong>Message:</strong> {alert.message}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No alerts available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserButtons;




import { useState, useEffect } from "react";
import shelter from "../assets/shelter.png";
import find from "../assets/find.png";
import gov from "../assets/gov.png";
import styles from "./UserButtons.module.css";

function UserButtons() {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from the backend
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:3001/alerts");
        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        } else {
          console.error("Failed to fetch alerts");
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className={styles.UserButtonsContainer}>
      <div className={styles.UserButtonsContent}>
        <div className={styles.UserButtonsContentUp}>
          <div className={styles.ContentUpBox}>
            <div className={styles.ContentUpBoxButtons}>
              <button className={styles.UserButtons}>
                <img src={shelter} alt="shelter" />
                <div className={styles.UserButtonsText}>Safe Shelter</div>
              </button>
              <button className={styles.UserButtons}>
                <img src={find} alt="find" />
                <div className={styles.UserButtonsText}>Find Missing</div>
              </button>
              <button className={styles.UserButtons}>
                <img src={gov} alt="Government" />
                <div className={styles.UserButtonsText}>Government</div>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.UserButtonsContentDown}>
          <div className={styles.ContentDownBox}>
            <div className={styles.ContentDownBoxHeading}>-- Alerts --</div>
            <div className={styles.ContentDownBoxAlerts}>
  {alerts.length > 0 ? (
    alerts.map((alert, index) => (
      <div key={index} className={styles.AlertItem}>
        <p>
          <strong>Message:</strong> {alert.message}
        </p>
        <p>
          <strong>Description:</strong> {alert.description}
        </p>
        <p>
          <strong>Location:</strong> {alert.location}
        </p>
      </div>
    ))
  ) : (
    <p>No alerts available</p>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserButtons;
