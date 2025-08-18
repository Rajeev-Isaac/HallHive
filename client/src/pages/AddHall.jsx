import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/css/AddHall.css";
import { toast } from "react-toastify";

const AddHall = () => {
  const [newHall, setNewHall] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleHallChange = (e) => {
    setNewHall({ ...newHall, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newHall.name);
      formData.append("location", newHall.location);
      formData.append("capacity", newHall.capacity);
      formData.append("price", newHall.price);
      formData.append("createdBy", user?._id || user?.id);
      if (imageFile) formData.append("image", imageFile);

      const res = await axios.post("http://localhost:5000/api/halls/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.msg || "Hall added successfully!");
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add hall");
    }
  };

  return (
    <div className="ah-container">
      <div className="ah-card">
        <h2 className="ah-title">Add New Hall</h2>
        <form className="ah-form" onSubmit={handleAddHall} encType="multipart/form-data">
          <input name="name" placeholder="Name" value={newHall.name} onChange={handleHallChange} required />
          <input name="location" placeholder="Location" value={newHall.location} onChange={handleHallChange} required />
          <input name="capacity" type="number" placeholder="Capacity" value={newHall.capacity} onChange={handleHallChange} required />
          <input name="price" type="number" placeholder="Price" value={newHall.price} onChange={handleHallChange} required />
          <input className="file-input" type="file" accept="image/*" onChange={handleImageChange} required />
          <button type="submit" className="button">Add Hall</button>
        </form>
      </div>
    </div>
  );
};

export default AddHall;