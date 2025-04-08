import { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.css"; // Correct import
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [flashMessage, setFlashMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginEndpoint =
      role === "admin"
        ? "http://localhost:3001/admin/login"
        : "http://localhost:3001/login";

    axios
      .post(loginEndpoint, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("role", role);

          setFlashMessage(
            `Login Successful! Redirecting to ${
              role === "admin" ? "Admin Dashboard" : "User Dashboard"
            }...`
          );

          setTimeout(() => {
            setFlashMessage("");
            navigate(role === "admin" ? "/admindashboard" : "/userdashboard");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setFlashMessage("Login Failed. Please check your credentials.");
      });
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />

      <div className={styles.formWrapper}>
        {flashMessage && (
          <div className={styles.flashMessage}>{flashMessage}</div>
        )}

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>LOGIN</h2>

            <div className={styles.roleSelection}>
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
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.linkContainer}>
              <Link to="/forgot" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <input className={styles.submit} type="submit" value="LOGIN" />

            <div className={styles.linkContainer}>
              <span>
                Don't have an account?{" "}
                <Link to="/register" className={styles.link}>
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
