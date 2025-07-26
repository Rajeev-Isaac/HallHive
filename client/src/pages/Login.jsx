import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hallImage from "../public/Login.jpg";
import './login.css'; // Ensure you have a CSS file for styles
//import "../App.css"; // Make sure this is imported for global styles

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="app-container" style={styles.container}>
      <div className="card" style={styles.card}>
        <h2 style={{ marginBottom: 24 }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" className="btn" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" className="btn" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn">Login</button>
        </form>
        <button
          onClick={handleRegister}
          className="btn"
        >
          New user? Register
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container : {
    minHeight: "90vh",
    minWidth: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${hallImage})`
  },
  card : {
    paddingTop: "5vh",
    color: "#81460A",
    fontFamily: "Playwrite AU QLD, cursive",
    fontOpticalSizing: "auto",
    fontSize: "50px",
    fontWeight: "bold",
    background: "#D8BE90A6",
    textAlign: "center",
    width: "30vw",
    height: "70vh",
  },
  button: {
    width: "10vw",
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing:  "auto",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: "2rem",
    backgroundColor: "#81460A",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  }
}
