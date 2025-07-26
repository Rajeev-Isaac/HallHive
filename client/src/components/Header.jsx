import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current path
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header style={styles.header}>
      <div style={styles.logo}>HallHive</div>
      <nav>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : !isAuthPage ? ( // 👈 check current route before showing buttons
          <>
            <Link to="/login" style={{ marginRight: "10px" }} className="logout-btn">Login</Link>
            <Link to="/register" className="logout-btn">Register</Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    fontSize: "25px",
    background: "#81460A",
    color: "#D8BE90",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontFamily: "Playwrite AU QLD, cursive",
    fontOpticalSizing: "auto",
    fontSize: "50px",
    fontWeight: "bold",
  },
  welcome: {
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing: "auto",
    fontWeight: 800,
    fontStyle: "normal",
    marginRight: "20px",
    fontSize: "40px",
  },
  logout: {
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing: "auto",
    fontWeight: 800,
    fontStyle: "normal",
    fontSize: "35px",
    padding: "8px 14px",
    background: "#D8BE90",
    border: "none",
    color: "#81460A",
    cursor: "pointer",
  },
};

export default Header;
