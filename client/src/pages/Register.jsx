import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/css/Register.css"; 
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      toast(res.data.msg);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="reg-container"
    >
      <div className="reg-card">
        <h2 className="reg-card-title">Register</h2>
        <form className="reg-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="reg-button">Register</button>
        </form>
        <button onClick={handleLogin} className="reg-button2">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
