// import React from "react";
import styles from "./UserDashboard.module.css";
import Navbar from "./Navbar.jsx";
import NewsSection from "./NewsSection.jsx";
import UserButtons from "./UserButtons.jsx";
import ContactForm from "./ContactForm.jsx";
import Footer from "./Footer.jsx";

const UserDashboard = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <main className={styles.main}>
          <Navbar />
        </main>
        <UserButtons />
        <NewsSection />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
