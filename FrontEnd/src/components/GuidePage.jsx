import styles from "./GuidePage.module.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
function GuidePage() {
  const disasterGuides = [
    {
      category: "Earthquake",
      instructions: [
        "Drop, Cover, and Hold On: Drop to your hands and knees, cover your head and neck, and hold on to something sturdy.",
        "Stay Indoors: If you're inside, stay there. Move away from windows, glass, and heavy furniture.",
        "If Outside: Move to an open area away from buildings, trees, and power lines.",
        "If in a Vehicle: Pull over to a safe location and stay inside until shaking stops.",
        "After Shaking: Check for injuries and damage. Be prepared for aftershocks.",
      ],
      precautions: [
        "Secure heavy furniture and appliances to walls",
        "Keep emergency supplies ready (water, food, first aid kit)",
        "Know how to shut off gas, water, and electricity",
        "Have a family emergency plan and meeting place",
        "Keep important documents in a waterproof container",
      ],
    },
    {
      category: "Flood",
      instructions: [
        "Move to Higher Ground: Immediately move to higher ground if flooding occurs",
        "Avoid Walking in Water: Don't walk through moving water above 6 inches",
        "Don't Drive in Floods: Never drive through flooded areas",
        "Stay Informed: Listen to weather reports and emergency broadcasts",
        "Evacuate if Ordered: Follow evacuation orders from authorities",
      ],
      precautions: [
        "Know your area's flood risk",
        "Keep important documents in waterproof containers",
        "Have an emergency kit ready",
        "Install flood sensors if possible",
        "Keep gutters and drains clear",
      ],
    },
    {
      category: "Fire",
      instructions: [
        "Get Out: Leave the building immediately",
        "Stay Low: Crawl under smoke if necessary",
        "Check Doors: Feel doors before opening them",
        "Use Stairs: Never use elevators during a fire",
        "Call Emergency: Dial emergency services (101)",
      ],
      precautions: [
        "Install and maintain smoke detectors",
        "Have fire extinguishers in key locations",
        "Keep flammable materials away from heat sources",
        "Practice fire escape plans regularly",
        "Know how to use fire extinguishers",
      ],
    },
    {
      category: "Cyclone",
      instructions: [
        "Stay Indoors: Remain in a secure building",
        "Stay Away from Windows: Move to the center of the building",
        "Turn Off Utilities: Shut off gas and electricity if ordered",
        "Listen to Authorities: Follow evacuation orders if given",
        "Have Emergency Kit Ready: Keep supplies accessible",
      ],
      precautions: [
        "Secure outdoor furniture and objects",
        "Trim trees and remove dead branches",
        "Keep emergency supplies ready",
        "Know evacuation routes",
        "Stay informed about weather updates",
      ],
    },
  ];

  return (
    <div className={styles.guidePageContainer}>
      <Navbar />
      <div className={styles.guideContainer}>
        <h1>Disaster Guide & Precautions</h1>
        <div className={styles.guideGrid}>
          {disasterGuides.map((guide, index) => (
            <div key={index} className={styles.guideCategory}>
              <h2>{guide.category}</h2>
              <div className={styles.guideSection}>
                <h3>Instructions</h3>
                <ul>
                  {guide.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.guideSection}>
                <h3>Precautions</h3>
                <ul>
                  {guide.precautions.map((precaution, i) => (
                    <li key={i}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default GuidePage;
