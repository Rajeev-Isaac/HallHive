import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../public/css/BookHall.css"; 
import { toast } from "react-toastify";

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
      toast.success("Booking successful! Proceed to payment.");
      navigate(`/payment?bookingId=${res.data.booking._id}`);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Booking failed");
    }
  };

  if (!hall) return <div>Loading...</div>;

  return (
    <div className="book-hall-page">
      <button className="go-back" onClick={() => navigate("/home")}>←</button>
      <div className="book-hall-container">
        <h2>Book: {hall.name}</h2>
        <form className="book-hall-form" onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <label>Estimated Guests:</label>
          <input
            type="number"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
            min="1"
          />
          <label>Your Name:</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" >Book & Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookHall;