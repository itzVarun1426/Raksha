// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import rakshaLogo from "../assets/raksha-logo.png";
// import styles from "./RegisterPage.module.css";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     aadhaarNumber: "",
//     mobileNumber: "",
//     password: "",
//     birthDate: "",
//     gender: "Male",
//   });

//   const [error, setError] = useState("");

//   const validateForm = () => {
//     if (Object.values(formData).some((value) => value.trim() === "")) {
//       return "All fields are required.";
//     }
//     if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
//       return "Aadhaar number must be exactly 12 digits.";
//     }
//     if (!/^\d{10}$/.test(formData.mobileNumber)) {
//       return "Mobile number must be exactly 10 digits.";
//     }
//     if (formData.password.length < 6) {
//       return "Password must be at least 6 characters long.";
//     }
//     return null;
//   };

//   const handleChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
//     console.log("Registered Data:", formData);
//     setError("");
//   };

//   return (
//     <div className={styles.registerPageContainer}>
//       <Link className={styles.registerLogoImage} to="/">
//         <img src={rakshaLogo} alt="logo" />
//       </Link>
//       <form className={styles.formContainer} onSubmit={handleSubmit}>
//         <p className={styles.registerTitle}>Register</p>
//         <div className={styles.inputGroup}>
//           <label className={styles.inputLabel}>
//             <input
//               required
//               placeholder=" "
//               type="text"
//               className={styles.inputField}
//               name="firstName"
//               onChange={handleChange}
//             />
//             <span>Firstname</span>
//           </label>
//           <label className={styles.inputLabel}>
//             <input
//               required
//               placeholder=" "
//               type="text"
//               className={styles.inputField}
//               name="lastName"
//               onChange={handleChange}
//             />
//             <span>Lastname</span>
//           </label>
//         </div>
//         <label className={styles.inputLabel}>
//           <input
//             required
//             placeholder=" "
//             type="email"
//             className={styles.inputField}
//             name="email"
//             onChange={handleChange}
//           />
//           <span>Email</span>
//         </label>
//         <label className={styles.inputLabel}>
//           <input
//             required
//             placeholder=" "
//             type="password"
//             className={styles.inputField}
//             name="password"
//             onChange={handleChange}
//           />
//           <span>Password</span>
//         </label>
//         <label className={styles.inputLabel}>
//           <input
//             required
//             placeholder=" "
//             type="password"
//             className={styles.inputField}
//             name="confirmPassword"
//             onChange={handleChange}
//           />
//           <span>Confirm Password</span>
//         </label>
//         <button className={styles.submitButton} type="submit">
//           Submit
//         </button>
//         <p className={styles.signInText}>
//           Already have an account? <Link to="/login">Sign in</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;


import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import rakshaLogo from "../assets/raksha-logo.png";
import "./RegisterPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!email || !aadhaarNumber || !mobileNumber || !password) {
      setError("All fields are required.");
      return;
    }
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Send data to the backend
    axios
      .post("http://localhost:3001/register", {
        email,
        aadhaarNumber,
        mobileNumber,
        password,
        // role, // Include role in the registration data
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login"); // Redirect to login page after successful registration
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="register-page-container">
      <Link className="register-logo-image" to="/">
        <img src={rakshaLogo} alt="logo" />
      </Link>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>

        {/* Role Selection */}
        {/* <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div> */}

        <input style={{width:"80%"}}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          required
        />
        <br />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <br />
        <input 
          style={{width:"80%"}} 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
