import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/css/Home.css"; 
import { toast } from "react-toastify";

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
      toast.success(res.data.msg || "Hall added successfully!");
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
      toast.error(err.response?.data?.msg || "Failed to add hall");
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
    <div className="home-container">
      <h2>Welcome {user?.name || "Guest"}!</h2>

      {user?.role === "customer" && (
        <button
          className="bkd-button"
          onClick={handleViewBookedHalls}
        >
          Your Booked Halls
        </button>
      )}

      {user?.role === "admin" && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <button className="add-hall-button" onClick={() => navigate("/add-hall")}>
            Add New Hall
          </button>
          <button className="view-bks-button" onClick={() => navigate("/admin-bookings")}>
            View All Bookings
          </button>
        </div>
      )}

      {user?.role === "customer" && (
        <><h3 className="home-title">Search Halls</h3>
        <div className="search-container">
          <input className="byname" name="name" placeholder="Search by Name" value={search.name} onChange={handleSearchChange} />
          <input className="bylocation" name="location" placeholder="Search by Location" value={search.location} onChange={handleSearchChange} />
          <input className="bycapacity" name="minCapacity" type="number" placeholder="Min Capacity" value={search.minCapacity} onChange={handleSearchChange} style={{ width: "48%" }} />
          <input className="bycapacity" name="maxCapacity" type="number" placeholder="Max Capacity" value={search.maxCapacity} onChange={handleSearchChange} style={{ width: "48%" }} />
          <input className="byprice" name="minPrice" type="number" placeholder="Min Price" value={search.minPrice} onChange={handleSearchChange} style={{ width: "48%" }} />
          <input className="byprice" name="maxPrice" type="number" placeholder="Max Price" value={search.maxPrice} onChange={handleSearchChange} style={{ width: "48%" }} />
          <input className="bydate" name="date" type="date" value={search.date} onChange={(e) => setSearch({ ...search, date: e.target.value })} placeholder="Select Date" style={{ width: "48%" }} />
          </div>
        </>
        
      )}

      <h3 className="home-title">Available Halls</h3>
      {(user?.role === "customer" ? filteredHalls : halls).length === 0 ? (
        <p>No halls available</p>
      ) : (
        (user?.role === "customer" ? filteredHalls : halls).map((hall) => (
          <div key={hall._id} className="card">
          {/* Left Section: Details and Book Now button */}
            <div className="card-details">
              <h4>{hall.name}</h4>
                <p><strong>Location:</strong> {hall.location}</p>
                <p><strong>Capacity:</strong> {hall.capacity}</p>
                <p><strong>Price:</strong> ₹{hall.price}</p>
                {search.date && hall.isBookedOnDate ? (
                  <div className="booked-message">
                    Already booked on {search.date}
                  </div>
                ) : (
                user?.role === "customer" && (
                <button onClick={() => handleBooking(hall._id)} className="button">
                  Book Now
                </button>
              )
          )}
          </div>
          {/* Right Section: Image */}
            <div className="card-image-container">
            <img
              src={hall.image ? `http://localhost:5000/uploads/${hall.image}` : "https://via.placeholder.com/350x200?text=No+Image"}
              alt={hall.name}
              className="img-responsive"
              onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200?text=No+Image"; }}
            />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
