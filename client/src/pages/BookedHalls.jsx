import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/css/BookedHalls.css"; 

const BookedHalls = () => {
  const [userBookings, setUserBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.id || user?._id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/bookings/user/${user._id || user.id}`);
          setUserBookings(res.data);
        } catch (err) {
          setUserBookings([]);
        }
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="bh-back">
      <button className="go-back" onClick={() => navigate("/home")}>←</button>
      <h2 className="bh-title">Your Booked Halls</h2>
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        userBookings.map((booking) => (
          <div key={booking._id} className="bh-card">
            <div className="bh-card-details">
              <h4>{booking.hall.name}</h4>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Location:</strong> {booking.hall.location}</p>
              <p><strong>Price:</strong> ₹{booking.hall.price}</p>
              <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
              <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
            </div>
            <div className="bh-card-image-container">
              <img
                src={
                  booking.hall.image
                    ? `http://localhost:5000/uploads/${booking.hall.image}`
                    : "https://via.placeholder.com/350x200?text=No+Image"
                }
                alt={booking.hall.name}
                className="bh-img-responsive"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/350x200?text=No+Image";
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookedHalls;