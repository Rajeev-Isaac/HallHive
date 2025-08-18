import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [halls, setHalls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    image: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAdminHalls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/halls");
      const myHalls = res.data.filter((h) => h.createdBy === user.id);
      setHalls(myHalls);
    } catch (err) {
      console.error("Error fetching halls", err);
    }
  };

  useEffect(() => {
    fetchAdminHalls();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/halls/add", {
        ...formData,
        createdBy: user.id,
      });
      ("Hall added successfully!");
      setFormData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        image: "",
      });
      fetchAdminHalls();
    } catch (err) {
      toast.error("Error adding hall");
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Welcome Admin {user.name}!</h2>
      <h3>Add a New Hall</h3>
      <form onSubmit={handleAddHall} style={styles.form}>
        <input
          name="name"
          placeholder="Hall Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="capacity"
          placeholder="Capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Hall</button>
      </form>

      <h3>Your Halls</h3>
      {halls.length === 0 ? (
        <p>No halls added yet.</p>
      ) : (
        halls.map((hall) => (
          <div key={hall._id} style={styles.card}>
            <h4>{hall.name}</h4>
            <p>📍 {hall.location}</p>
            <p>👥 Capacity: {hall.capacity}</p>
            <p>💰 ₹{hall.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    maxWidth: "400px",
  },
};

export default AdminDashboard;
