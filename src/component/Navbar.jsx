import {
  FaBlog,
  FaChartBar,
  FaHome,
  FaMoon,
  FaPlusSquare,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");

  const userName = authData?.name || authData?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo">
          <FaBlog className="logo-icon" />
          <span className="logo-text">BlogPost</span>
        </div>

        {/* LINKS */}
        <div className="navbar-links">
          <NavLink to="/dashboard" className="nav-item">
            <FaHome className="nav-icon" /> Home
          </NavLink>

          <NavLink to="/create-post" className="nav-item">
            <FaPlusSquare className="nav-icon" /> Create Post
          </NavLink>

          <NavLink to="/analytics" className="nav-item">
            <FaChartBar className="nav-icon" /> Analytics
          </NavLink>
        </div>

        {/* ACTIONS */}
        <div className="navbar-actions">
          {/* userName FIXED */}
          <span className="user-name">Hi, {userName}</span>

          {/* THEME BUTTON */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/*Logout FIXED */}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
