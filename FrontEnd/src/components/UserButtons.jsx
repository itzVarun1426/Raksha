import { useState, useEffect } from "react";
import shelterIcon from "../assets/shelter.png";
import findIcon from "../assets/find.png";
import govIcon from "../assets/gov.png";
import styles from "./UserButtons.module.css";

function UserButtons() {
  const [showShelterPopup, setShowShelterPopup] = useState(false);
  const [showMissingPopup, setShowMissingPopup] = useState(false);
  const [shelterList, setShelterList] = useState([]);
  const [missingList, setMissingList] = useState([]);
  const [missingPerson, setMissingPerson] = useState({
    photo: "",
    name: "",
    age: "",
    gender: "",
    description: "",
  });

  useEffect(() => {
    const storedShelters = JSON.parse(localStorage.getItem("safeZones")) || [];
    setShelterList(storedShelters);
    const storedMissing =
      JSON.parse(localStorage.getItem("missingPersons")) || [];
    setMissingList(storedMissing);
  }, []);

  const handleMissingSubmit = () => {
    const updatedList = [...missingList, missingPerson];
    setMissingList(updatedList);
    localStorage.setItem("missingPersons", JSON.stringify(updatedList));
    setShowMissingPopup(false);
    setMissingPerson({
      photo: "",
      name: "",
      age: "",
      gender: "",
      description: "",
    });
  };

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
        {/* Top Section */}
        <div className={styles.UserButtonsContentUp}>
          <div className={styles.ContentUpBox}>
            <div className={styles.ContentUpBoxButtons}>
              <button
                className={styles.UserButtons}
                onClick={() => setShowShelterPopup(true)}
              >
                <img src={shelterIcon} alt="Safe Shelter" loading="lazy" />
                <span className={styles.UserButtonsText}>Safe Shelter</span>
              </button>
              <button
                className={styles.UserButtons}
                onClick={() => setShowMissingPopup(true)}
              >
                <img src={findIcon} alt="Find Missing" loading="lazy" />
                <span className={styles.UserButtonsText}>Find Missing</span>
              </button>
              {/* <button className={styles.UserButtons}>
                <img src={govIcon} alt="Government" loading="lazy" />
                <span className={styles.UserButtonsText}>Government</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className={styles.UserButtonsContentDown}>
          <div className={styles.ContentDownBox}>
            <h3 className={styles.ContentDownBoxHeading}>-- Alerts --</h3>
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

      {/* Shelter Popup */}
      {showShelterPopup && (
        <div className={styles.ShelterPopupOverlay}>
          <div className={styles.ShelterPopup}>
            <div className={styles.PopupHeader}>
              <h2>Safe Shelters</h2>
              <button
                className={styles.CloseButton}
                onClick={() => setShowShelterPopup(false)}
                aria-label="Close Shelter Popup"
              >
                ✖
              </button>
            </div>
            <div className={styles.ShelterGrid}>
              {shelterList.length > 0 ? (
                shelterList.map((shelter, index) => (
                  <div key={index} className={styles.ShelterCard}>
                    {shelter.image && (
                      <img
                        src={shelter.image}
                        alt={`Shelter at ${shelter.location}`}
                        loading="lazy"
                      />
                    )}
                    <h3>{shelter.name}</h3>
                    <p>{shelter.location}</p>
                    <a
                      href={shelter.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.MapButton}
                    >
                      View on Map
                    </a>
                  </div>
                ))
              ) : (
                <p>No shelters available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Missing Person Popup */}
      {showMissingPopup && (
        <div className={styles.ShelterPopupOverlay}>
          <div className={styles.ShelterPopup}>
            <div className={styles.PopupHeader}>
              <h2>Report Missing Person</h2>
              <button
                className={styles.CloseButton}
                onClick={() => setShowMissingPopup(false)}
                aria-label="Close Missing Popup"
              >
                ✖
              </button>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) =>
                  setMissingPerson({
                    ...missingPerson,
                    photo: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setMissingPerson({ ...missingPerson, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Age"
                onChange={(e) =>
                  setMissingPerson({ ...missingPerson, age: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setMissingPerson({ ...missingPerson, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <textarea
                placeholder="Description"
                onChange={(e) =>
                  setMissingPerson({
                    ...missingPerson,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <button onClick={handleMissingSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserButtons;
