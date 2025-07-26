import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [halls, setHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [allBookings, setAllBookings] = useState([]); // <-- all bookings for all halls
  const [newHall, setNewHall] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);

  const [search, setSearch] = useState({
    name: "",
    location: "",
    minCapacity: "",
    maxCapacity: "",
    minPrice: "",
    maxPrice: "",
    date: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/halls");
        setHalls(res.data);
        setFilteredHalls(res.data);
      } catch (err) {
        console.error("Error fetching halls", err);
      }
    };

    const fetchAllBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/all");
        setAllBookings(res.data);
      } catch (err) {
        setAllBookings([]);
      }
    };

    fetchHalls();
    fetchAllBookings();
  }, []);

  // Filtering logic with date availability
  useEffect(() => {
    let result = halls;

    if (search.name)
      result = result.filter(hall =>
        hall.name.toLowerCase().includes(search.name.toLowerCase())
      );
    if (search.location)
      result = result.filter(hall =>
        hall.location.toLowerCase().includes(search.location.toLowerCase())
      );
    if (search.minCapacity)
      result = result.filter(hall =>
        Number(hall.capacity) >= Number(search.minCapacity)
      );
    if (search.maxCapacity)
      result = result.filter(hall =>
        Number(hall.capacity) <= Number(search.maxCapacity)
      );
    if (search.minPrice)
      result = result.filter(hall =>
        Number(hall.price) >= Number(search.minPrice)
      );
    if (search.maxPrice)
      result = result.filter(hall =>
        Number(hall.price) <= Number(search.maxPrice)
      );
    if (search.date) {
      result = result.map(hall => {
        // Find bookings for this hall on the selected date
        const bookingsForHall = allBookings.filter(
          b => b.hall._id === hall._id && b.date === search.date
        );
        return {
          ...hall,
          isBookedOnDate: bookingsForHall.length > 0,
          bookedBy: bookingsForHall.length > 0 ? bookingsForHall[0].customerName : null
        };
      });
    } else {
      result = result.map(hall => ({ ...hall, isBookedOnDate: false, bookedBy: null }));
    }

    setFilteredHalls(result);
  }, [search, halls, allBookings]);

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
      alert(res.data.msg || "Hall added successfully!");
      setHalls([...halls, res.data.hall]);
      setNewHall({
        name: "",
        location: "",
        capacity: "",
        price: "",
        image: ""
      });
      setImageFile(null);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add hall");
    }
  };

  const handleBooking = (hallId) => {
    navigate(`/book/${hallId}`);
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleViewBookedHalls = () => {
    navigate("/booked-halls");
  };

  return (
    <div className="app-container">
      <h2>Welcome {user?.name || "Guest"}!</h2>

      {user?.role === "customer" && (
        <button
          className="button"
          style={{ background: "#007bff", marginBottom: 20 }}
          onClick={handleViewBookedHalls}
        >
          View My Booked Halls
        </button>
      )}

      {user?.role === "admin" && (
        <div className="card">
          <h3>Add New Hall</h3>
          <form onSubmit={handleAddHall} encType="multipart/form-data">
            <input name="name" placeholder="Name" value={newHall.name} onChange={handleHallChange} required />
            <input name="location" placeholder="Location" value={newHall.location} onChange={handleHallChange} required />
            <input name="capacity" type="number" placeholder="Capacity" value={newHall.capacity} onChange={handleHallChange} required />
            <input name="price" type="number" placeholder="Price" value={newHall.price} onChange={handleHallChange} required />
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            <button type="submit" className="button">Add Hall</button>
          </form>
        </div>
      )}

      {user?.role === "customer" && (
        <div className="card" style={{ maxWidth: 400 }}>
          <h3>Search Halls</h3>
          <input name="name" placeholder="Search by Name" value={search.name} onChange={handleSearchChange} />
          <input name="location" placeholder="Search by Location" value={search.location} onChange={handleSearchChange} />
          <div style={{ display: "flex", gap: "8px" }}>
            <input name="minCapacity" type="number" placeholder="Min Capacity" value={search.minCapacity} onChange={handleSearchChange} style={{ width: "48%" }} />
            <input name="maxCapacity" type="number" placeholder="Max Capacity" value={search.maxCapacity} onChange={handleSearchChange} style={{ width: "48%" }} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input name="minPrice" type="number" placeholder="Min Price" value={search.minPrice} onChange={handleSearchChange} style={{ width: "48%" }} />
            <input name="maxPrice" type="number" placeholder="Max Price" value={search.maxPrice} onChange={handleSearchChange} style={{ width: "48%" }} />
          </div>
          <input name="date" type="date" placeholder="Date" value={search.date} onChange={handleSearchChange} />
        </div>
      )}

      <h3>Available Halls</h3>
      {(user?.role === "customer" ? filteredHalls : halls).length === 0 ? (
        <p>No halls available</p>
      ) : (
        (user?.role === "customer" ? filteredHalls : halls).map((hall) => (
          <div key={hall._id} className="card">
            <h4>{hall.name}</h4>
            <p><strong>Location:</strong> {hall.location}</p>
            <p><strong>Capacity:</strong> {hall.capacity}</p>
            <p><strong>Price:</strong> ₹{hall.price}</p>
            <img
              src={hall.image ? `http://localhost:5000/uploads/${hall.image}` : "https://via.placeholder.com/350x200?text=No+Image"}
              alt={hall.name}
              className="img-responsive"
              onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200?text=No+Image"; }}
            />
            {search.date && hall.isBookedOnDate ? (
              <div style={{ color: "red", fontWeight: "bold", marginTop: 10 }}>
                Already booked on {search.date}
                {hall.bookedBy && <span> by {hall.bookedBy}</span>}
              </div>
            ) : (
              user?.role === "customer" && (
                <button onClick={() => handleBooking(hall._id)} className="button">
                  Book Now
                </button>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
