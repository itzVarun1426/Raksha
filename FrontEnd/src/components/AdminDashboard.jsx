import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showMissingPersons, setShowMissingPersons] = useState(false);
  const [location, setLocation] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [missingPersons, setMissingPersons] = useState([]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("safeZones")) || [];
  }, []);

  const handleSubmit = () => {
    if (!location || !mapLink || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newZone = {
      location,
      mapLink,
      image: URL.createObjectURL(image),
    };

    const storedZones = JSON.parse(localStorage.getItem("safeZones")) || [];
    const updatedZones = [...storedZones, newZone];
    localStorage.setItem("safeZones", JSON.stringify(updatedZones));

    setLocation("");
    setMapLink("");
    setImage(null);
    setPreviewImage(null);
    setShowForm(false);
  };

  const handleShowMissingPersons = () => {
    const storedData = localStorage.getItem("missingPersons");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setMissingPersons(parsedData);
        setShowMissingPersons(true);
      } catch (error) {
        console.error("Error parsing missing persons data:", error);
        setMissingPersons([]); // Set an empty array to prevent crashes
      }
    } else {
      setMissingPersons([]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    type: "",
    description: "",
    location: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertData({ ...alertData, [name]: value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/admin/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        alert("Alert created successfully!");
        setIsModalOpen(false);
        setAlertData({ message: "", type: "", description: "", location: "" });
      } else {
        alert("Failed to create alert");
      }
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  return (
    <>
      <div className={styles.AdminDashboardContainer}>
        <AdminNavbar />
        <div className={styles.AdminDashboardContent}>
          <div className={styles.AdminDashboardContentLeft}>
            <div className={styles.AdminDashboardContentLeftHeading}>
              Dashboard
            </div>
            <div className={styles.AdminDashboardContentLeftButtons}>
              <button
                className={styles.AdminDashboardButton}
                onClick={handleOpenModal}
              >
                Create Alerts
              </button>
              <button
                className={styles.AdminDashboardButton}
                onClick={() => setShowForm(true)}
              >
                Add Safe Zone
              </button>
              <button
                className={styles.AdminDashboardButton}
                onClick={handleShowMissingPersons}
              >
                Missing Persons
              </button>
            </div>
          </div>
          <div className={styles.AdminDashboardContentRight}>
            <div className={styles.AdminDashboardContentRightHeading}>
              Missing Persons List
            </div>
            <div className={styles.MissingPersonsList}>
              {missingPersons.length === 0 ? (
                <p>No missing persons found.</p>
              ) : (
                <ul>
                  {missingPersons.map((person, index) => (
                    <li key={index}>
                      <strong>Name:</strong> {person.name || "N/A"} |
                      <strong> Age:</strong> {person.age || "Unknown"} |
                      <strong> Gender:</strong>{" "}
                      {person.gender || "Not specified"} |
                      <strong> Description:</strong>{" "}
                      {person.description || "No details available"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className={styles.FormOverlay}>
          <div className={styles.FormContainer}>
            <h2>Add Safe Zone</h2>
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.InputField}
            />
            <input
              type="text"
              placeholder="Google Maps Link"
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              className={styles.InputField}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
              className={styles.InputField}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className={styles.PreviewImage}
              />
            )}
            <div className={styles.FormButtons}>
              <button onClick={handleSubmit} className={styles.SubmitButton}>
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className={styles.CancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMissingPersons && (
        <div className={styles.FormOverlay}>
          <div className={styles.reportPanel}>
            <button
              className={styles.closeButton}
              onClick={() => setShowMissingPersons(false)}
            >
              &times;
            </button>
            <h2>Missing Persons Reports</h2>
            {missingPersons.length === 0 ? (
              <p>No reports found.</p>
            ) : (
              <div className={styles.SafeZonesGrid}>
                {missingPersons.map((person, index) => (
                  <div key={index} className={styles.SafeZoneCard}>
                    <img
                      src={person.photo || "default-placeholder.png"}
                      alt="Missing Person"
                    />
                    <p>
                      <strong>Name:</strong> {person.name || "N/A"}
                    </p>
                    <p>
                      <strong>Age:</strong> {person.age || "Unknown"}
                    </p>
                    <p>
                      <strong>Gender:</strong>{" "}
                      {person.gender || "Not specified"}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {person.description || "No details available"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
  
      {isModalOpen && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <h2>Create Alert</h2>
            <form onSubmit={handleSubmit1}>
              <label>
                Alert Message:
                <input
                  type="text"
                  name="message"
                  value={alertData.message}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Alert Type:
                <select
                  name="type"
                  value={alertData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Warning">Warning</option>
                  <option value="Information">Information</option>
                </select>
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={alertData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={alertData.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className={styles.FormButtons}>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
