import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerDashboard() {
  const [halls, setHalls] = useState([]);
  const [bookingDate, setBookingDate] = useState({}); // store dates per hall

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/halls");
        setHalls(data);
      } catch (err) {
        console.error("Failed to fetch halls", err);
      }
    };

    fetchHalls();
  }, []);

  const handleDateChange = (hallId, value) => {
    setBookingDate((prev) => ({ ...prev, [hallId]: value }));
  };

  const handleBooking = async (hallId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/bookings/book", {
        hall: hallId,
        user: user.id,
        date: bookingDate[hallId],
      });

      toast("Booking successful");
    } catch (err) {
      toast.error("Booking failed");
      console.error("Booking error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome {user.name}!</h2>
      <h3>Available Halls</h3>

      {halls.length === 0 ? (
        <p>No halls found.</p>
      ) : (
        halls.map((hall) => (
          <div key={hall._id} style={styles.card}>
            <img
              src={hall.image ? `http://localhost:5000/uploads/${hall.image}` : "https://via.placeholder.com/350x200?text=No+Image"}
              alt={hall.name}
              className="img-responsive"
              onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200?text=No+Image"; }}
              style={styles.image}
            />
            <h4>{hall.name}</h4>
            <p>
              <strong>Location:</strong> {hall.location}
            </p>
            <p>
              <strong>Capacity:</strong> {hall.capacity}
            </p>
            <p>
              <strong>Price:</strong> ₹{hall.price}
            </p>

            <input
              type="date"
              value={bookingDate[hall._id] || ""}
              onChange={(e) => handleDateChange(hall._id, e.target.value)}
              style={styles.input}
            />
            <button onClick={() => handleBooking(hall._id)} style={styles.button}>
              Book Hall
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    maxWidth: "500px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  input: {
    marginTop: "10px",
    padding: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default CustomerDashboard;
