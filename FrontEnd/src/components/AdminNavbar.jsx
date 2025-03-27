import  { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminNavbar.module.css";
import chatbotIcon from "../assets/chatbot.png";
import rakshaLogo from "../assets/raksha-logo.png";
import Chatbot from "./Chatbot";

function Navbar() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.chatbot} onClick={toggleChatbot}>
        <img src={chatbotIcon} alt="chatbot" height="55px" width="55px" />
      </div>
      <nav className={styles.nav}>
        <div className={styles.logoImage}>
          <NavLink to="/"  className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }><img src={rakshaLogo} alt="logo" /></NavLink>
          
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
        </ul>
      </nav>

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
