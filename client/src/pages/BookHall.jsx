import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookHall = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [form, setForm] = useState({
    date: "",
    guests: "",
    customerName: "",
    phone: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHall = async () => {
      const res = await axios.get(`http://localhost:5000/api/halls/`);
      const found = res.data.find(h => h._id === hallId);
      setHall(found);
    };
    fetchHall();
  }, [hallId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post("http://localhost:5000/api/bookings/book", {
        hall: hallId,
        user: user?._id || user?.id,
        ...form
      });
      alert("Booking successful! Proceed to payment.");
      navigate(`/payment?bookingId=${res.data.booking._id}`);
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  if (!hall) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Book: {hall.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <label>Estimated Guests:</label>
          <input
            type="number"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
          <label>Your Name:</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Book & Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "350px"
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    backgroundColor: "#4B0082",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default BookHall;