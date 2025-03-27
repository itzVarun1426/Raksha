import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import "./App.css";
import GuidePage from "./components/GuidePage";
import HelplinePage from "./components/HelplinePage";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/helpline" element={<HelplinePage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
