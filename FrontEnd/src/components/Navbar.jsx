// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import styles from "./Navbar.module.css";
// import chatbotIcon from "../assets/chatbot.png";
// import rakshaLogo from "../assets/raksha-logo.png";
// import languageIcon from "../assets/language.png";
// import Chatbot from "./Chatbot";

// function Navbar() {
//   const [isChatbotVisible, setIsChatbotVisible] = useState(false);
//   const [alerts, setAlerts] = useState([]);

//   const toggleChatbot = () => {
//     setIsChatbotVisible(!isChatbotVisible);
//   };

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
//     <div className={styles.navContainer}>
//       <div className={styles.chatbot} onClick={toggleChatbot}>
//         <img src={chatbotIcon} alt="chatbot" height="55px" width="55px" />
//       </div>
//       <nav className={styles.nav}>
//         <div className={styles.logoImage}>
//           <NavLink to="/">
//             <img src={rakshaLogo} alt="logo" />
//           </NavLink>
//         </div>
//         <ul>
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? styles.active : styles.navLink
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/guide"
//               className={({ isActive }) =>
//                 isActive ? styles.active : styles.navLink
//               }
//             >
//               Guide
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/helpline"
//               className={({ isActive }) =>
//                 isActive ? styles.active : styles.navLink
//               }
//             >
//               Helpline
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/login"
//               className={({ isActive }) =>
//                 isActive ? styles.active : styles.navLink
//               }
//             >
//               Login
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="#"
//               className={({ isActive }) =>
//                 isActive ? styles.active : styles.navLink
//               }
//             >
//               <img src={languageIcon} alt="language" />
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
// <div className={styles.scrollText}>
//   <marquee behavior="scroll">
//     {alerts.map((alert, index) => (
//       <span
//         key={index}
//         style={{
//           color: alert.type === "Warning" ? "red" : "black", // Highlight warnings in red
//           fontWeight: alert.type === "Warning" ? "bold" : "normal",
//           marginRight: "20px", // Add spacing between alerts
//         }}
//       >
//         {alert.message}
//       </span>
//     ))}
//   </marquee>
// </div>
//       {isChatbotVisible && (
//         <div className={styles.chatbotPopup}>
//           <Chatbot />
//           <button onClick={toggleChatbot} className={styles.closeButton}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import chatbotIcon from "../assets/chatbot.png";
import rakshaLogo from "../assets/raksha-logo.png";
import languageIcon from "../assets/language.png";
import Chatbot from "./Chatbot";

function Navbar() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

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

  // Check login status
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(!!isUserLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.chatbot} onClick={toggleChatbot}>
        <img src={chatbotIcon} alt="chatbot" height="55px" width="55px" />
      </div>
      <nav className={styles.nav}>
        <div className={styles.logoImage}>
          <NavLink to="/">
            <img src={rakshaLogo} alt="logo" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/guide"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              Guide
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/helpline"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              Helpline
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
                style={{ backgroundColor: "white" }}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navLink
                }
              >
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              <img src={languageIcon} alt="language" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.scrollText}>
        <marquee behavior="scroll">
          {alerts.map((alert, index) => (
            <span
              key={index}
              style={{
                color: alert.type === "Warning" ? "red" : "black", // Highlight warnings in red
                fontWeight: alert.type === "Warning" ? "bold" : "normal",
                marginRight: "20px", // Add spacing between alerts
              }}
            >
              {alert.message}
            </span>
          ))}
        </marquee>
      </div>
      {isChatbotVisible && (
        <div className={styles.chatbotPopup}>
          <Chatbot />
          <button onClick={toggleChatbot} className={styles.closeButton}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
