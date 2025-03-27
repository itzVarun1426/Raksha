// import React from "react";
import styles from "./LandingPage.module.css";
import Navbar from "./Navbar.jsx";
import NewsSection from "./NewsSection.jsx";
import StatsSection from "./StatsSection.jsx";
import ConceptSection from "./ConceptSection.jsx";
import Footer from "./Footer.jsx";
import LandingPageAlert from "./LandingPage-Alert.jsx";

const LandingPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <main className={styles.main}>
          <Navbar />
          <LandingPageAlert />
          {/* <DisasterButton /> */}
        </main>
        <NewsSection />
        <StatsSection />
        <ConceptSection />
        {/* <ContactForm /> */}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
