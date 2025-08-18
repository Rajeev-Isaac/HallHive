import React, { useEffect, useState } from "react";
import axios from "axios";
import "../public/css/AdminBookings.css"; 
const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/all");
        setBookings(res.data);
      } catch (err) {
        setBookings([]);
      }
    };
    fetchAllBookings();
  }, []);

  return (
    <div className="ab-container">
    <h2 className="ab-title">All Bookings</h2>
    <div className="ab-in-container">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="ab-card">
            <h4>{booking.hall?.name || "Hall Deleted"}</h4>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Customer:</strong> {booking.customerName}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
            <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default AdminBookings;