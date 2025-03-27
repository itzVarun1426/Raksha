// import AdminNavbar from "./AdminNavbar";
// import styles from "./AdminDashboard.module.css";
// function AdminDashboard() {
//   return (
//     <>
//       <div className={styles.AdminDashboardContainer}>
//         <AdminNavbar />
//         <div className={styles.AdminDashboardContent}>
//           <div className={styles.AdminDashboardContentLeft}>
//             <div className={styles.AdminDashboardContentLeftHeading}>
//               Dashboard
//             </div>
//             <div className={styles.AdminDashboardContentLeftButtons}>
//               <button className={styles.AdminDashboardButton}>
//                 Create Alerts
//               </button>
//               <button className={styles.AdminDashboardButton}>
//                 Add Safe Zone
//               </button>
//               <button className={styles.AdminDashboardButton}>
//                 Track News
//               </button>
//             </div>
//           </div>
//           <div className={styles.AdminDashboardContentRight}>
//             <div className={styles.AdminDashboardContentRightHeading}>
//               Forum
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default AdminDashboard;







// import AdminNavbar from "./AdminNavbar";
// import styles from "./AdminDashboard.module.css";
// import { useState } from "react";

// function AdminDashboard() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [alertData, setAlertData] = useState({ message: "", type: "" });

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAlertData({ ...alertData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3001/admin/alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(alertData),
//       });

//       if (response.ok) {
//         alert("Alert created successfully!");
//         setIsModalOpen(false);
//         setAlertData({ message: "", type: "" });
//       } else {
//         alert("Failed to create alert");
//       }
//     } catch (error) {
//       console.error("Error creating alert:", error);
//     }
  
//   };

//   return (
//     <>
//       <div className={styles.AdminDashboardContainer}>
//         <AdminNavbar />
//         <div className={styles.AdminDashboardContent}>
//           <div className={styles.AdminDashboardContentLeft}>
//             <div className={styles.AdminDashboardContentLeftHeading}>
//               Dashboard
//             </div>
//             <div className={styles.AdminDashboardContentLeftButtons}>
//               <button
//                 className={styles.AdminDashboardButton}
//                 onClick={handleOpenModal}
//               >
//                 Create Alerts
//               </button>
//               <button className={styles.AdminDashboardButton}>
//                 Add Safe Zone
//               </button>
//               <button className={styles.AdminDashboardButton}>
//                 Track News
//               </button>
//             </div>
//           </div>
//           <div className={styles.AdminDashboardContentRight}>
//             <div className={styles.AdminDashboardContentRightHeading}>
//               Forum
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className={styles.ModalOverlay}>
//           <div className={styles.Modal}>
//             <h2>Create Alert</h2>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Alert Message:
//                 <input
//                   type="text"
//                   name="message"
//                   value={alertData.message}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Alert Type:
//                 <select
//                   name="type"
//                   value={alertData.type}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Warning">Warning</option>
//                   <option value="Information">Information</option>
//                 </select>
//               </label>
//               <div className={styles.FormButtons}>
//                 <button type="submit">Submit</button>
//                 <button type="button" onClick={handleCloseModal}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AdminDashboard;






import AdminNavbar from "./AdminNavbar";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";

function AdminDashboard() {
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

  const handleSubmit = async (e) => {
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
              <button className={styles.AdminDashboardButton}>
                Add Safe Zone
              </button>
              <button className={styles.AdminDashboardButton}>
                Track News
              </button>
            </div>
          </div>
          <div className={styles.AdminDashboardContentRight}>
            <div className={styles.AdminDashboardContentRightHeading}>
              Forum
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <h2>Create Alert</h2>
            <form onSubmit={handleSubmit}>
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
