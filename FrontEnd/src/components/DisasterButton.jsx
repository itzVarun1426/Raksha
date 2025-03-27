import temp from "../assets/temp.png";
import flood from "../assets/flood.png";
import earthquake from "../assets/earthquake.png";
import covid from "../assets/covid.png";
import landslide from "../assets/landslide.png";
import thunder from "../assets/thunder.png";
import ice from "../assets/ice.png";
import drought from "../assets/drought.png";
import storm from "../assets/storm.png";
import shelter from "../assets/shelter.png";
import find from "../assets/find.png";
import gov from "../assets/gov.png";
import busInFloodImg from "../assets/busInFlood.jpg";
import disasterReliefImg from "../assets/disasterRelief.jpg";
import "./DisasterButton.css";

function DisasterButton() {
  const warningButtons = [
    { img: temp, title: "Fire", special: false },
    { img: flood, title: "Flood", special: false },
    { img: earthquake, title: "Earthquake", special: false },
    { img: covid, title: "Covid", special: false },
    { img: landslide, title: "Landslide", special: false },
    { img: thunder, title: "Thunder", special: false },
    { img: ice, title: "Ice", special: false },
    { img: drought, title: "drought", special: false },
    { img: storm, title: "Storm", special: false },
    { img: shelter, title: "Shelter", special: true },
    { img: find, title: "Find", special: true },
    { img: gov, title: "Gov", special: true },
  ];
  return (
    <>
      <section className="page2">
        <div className="page2-content">
          <div className="page2-left">
            <h2>News</h2>
            <div className="page2-left-button">
              {warningButtons.map((item, index) => (
                <div
                  key={index}
                  className="page2-left-button-card"
                  style={item.special ? { backgroundColor: "#9AA2AA" } : {}}
                >
                  <img src={item.img} alt={item.title} />
                  <h3>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="page2-right">
            <h2>Alerts</h2>
            <div className="page2-right-card">
              <input type="submit" value="search any news" />
              <div className="page2-right-card-news">
                <img src={busInFloodImg} alt="bus in flood" />
                <p>Huge flood in Assam</p>
              </div>
              <div className="page2-right-card-news">
                <img src={disasterReliefImg} alt="disaster relief" />
                <p>Wayanad Landslides</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DisasterButton;
