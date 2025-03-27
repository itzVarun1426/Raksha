// import React from 'react';
import Navbar from "./Navbar.jsx";
import "./HelplinePage.css";
import Footer from "./Footer.jsx";

function HelplinePage() {
  const helplineNumbers = [
    {
      category: "National Emergency Numbers",
      contacts: [
        { name: "Police", number: "100" },
        { name: "Fire", number: "101" },
        { name: "Ambulance", number: "108" },
        { name: "Women Helpline", number: "1091" },
        { name: "Child Helpline", number: "1098" },
      ],
    },
    {
      category: "Disaster Management",
      contacts: [
        {
          name: "National Disaster Management Authority",
          number: "011-26701728",
        },
        { name: "NDMA Control Room", number: "011-26701700" },
        { name: "NDRF Control Room", number: "011-24363260" },
      ],
    },
    {
      category: "Weather & Natural Disasters",
      contacts: [
        { name: "IMD Weather Helpline", number: "1800-180-1717" },
        { name: "Flood Control Room", number: "011-23893538" },
        { name: "Earthquake Helpline", number: "011-24363260" },
      ],
    },
    {
      category: "Medical Emergencies",
      contacts: [
        { name: "COVID-19 Helpline", number: "1075" },
        { name: "AIIMS Emergency", number: "011-26588500" },
        { name: "Red Cross Blood Bank", number: "011-23716441" },
      ],
    },
  ];

  return (
    <div className="helpline-page-container">
      <Navbar />
      <div className="helpline-container">
        <h1>Emergency Helpline Numbers</h1>
        <div className="helpline-grid">
          {helplineNumbers.map((category, index) => (
            <div key={index} className="helpline-category">
              <h2>{category.category}</h2>
              <div className="contact-list">
                {category.contacts.map((contact, i) => (
                  <div key={i} className="contact-item">
                    <span className="contact-name">{contact.name}</span>
                    <a
                      href={`tel:${contact.number}`}
                      className="contact-number"
                    >
                      {contact.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HelplinePage;
