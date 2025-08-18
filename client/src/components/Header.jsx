import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../public/css/Header.css"; 
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout Successful");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header">
      <Link className="logo" to="/">HallHive</Link>
      <nav className="nav">
        {user ? (
          <>
            <span className="welcome">Hi, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : !isAuthPage ? (
          <>
            <Link to="/login" className="logout-btn">Login</Link>
            <Link to="/register" className="logout-btn">Register</Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}

export default Header;
