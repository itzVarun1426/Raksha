import "./ContactForm.css";
function ContactForm() {
  return (
    <>
      <div className="page5">
        <div className="page5-header">
          <p>Contact Us</p>
        </div>
        <div className="page5-box">
          <div className="form-group">
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <input type="tel" placeholder="Your number" required />
            <textarea placeholder="Subject" required></textarea>
          </div>
          <div className="form-group">
            <textarea placeholder="Write your Message here" required></textarea>
            <button type="submit">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
