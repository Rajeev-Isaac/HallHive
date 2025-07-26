import React, { useEffect, useState } from "react";
import axios from "axios";

const BookedHalls = () => {
  const [userBookings, setUserBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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
    <div style={{ padding: "20px" }}>
      <h2>Your Booked Halls</h2>
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        userBookings.map((booking) => (
          <div key={booking._id} style={styles.card}>
            <h4>{booking.hall.name}</h4>
            <img
              src={booking.hall.image ? `http://localhost:5000/uploads/${booking.hall.image}` : "https://via.placeholder.com/350x200?text=No+Image"}
              alt={booking.hall.name}
              className="img-responsive"
              onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200?text=No+Image"; }}
            />
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Location:</strong> {booking.hall.location}</p>
            <p><strong>Price:</strong> ₹{booking.hall.price}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
            <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #bbb",
    borderRadius: "8px",
    margin: "10px 0",
    padding: "15px",
    maxWidth: "350px",
    background: "#f8fdff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }
};

export default BookedHalls;