import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/css/Login.css"; // Adjust the path as necessary
import { toast } from "react-toastify";

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
      //alert("Login successful!");
      toast.success("Login Successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="login-container"
    >
      <div className="login-card" >
        <h2 className="login-card-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="loginbutton">Login</button>
        </form>
        <button onClick={handleRegister} className="loginbutton">
          New user? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
