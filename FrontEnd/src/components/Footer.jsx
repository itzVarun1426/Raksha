import rakshaLogo from "../assets/Raksha-logo.png";
import {
  FaPhoneSquare,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";  
import "./Footer.css";

function Footer() {
  const socialLinks = [
    {
      icon: <FaPhoneSquare aria-hidden="true" />,
      url: "tel:+1234567890",
      label: "Call Us",
    },
    {
      icon: <FaInstagram aria-hidden="true" />,
      url: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <FaFacebook aria-hidden="true" />,
      url: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaTwitter aria-hidden="true" />,
      url: "https://twitter.com",
      label: "Twitter",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-links">
        <h2 className="footer-title">Contact Us</h2>
        <ul className="social-links">
          {socialLinks.map((social, index) => (
            <li key={index} className="social-item">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-link"
                title={social.label}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-image">
        <img src={rakshaLogo} alt="Raksha Logo" height="150" width="150" />
      </div>
    </footer>
  );
}

export default Footer;
