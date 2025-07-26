// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BookHall from "./pages/BookHall";
import Payment from "./pages/Payment";
import BookedHalls from "./pages/BookedHalls";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

// Wrapper for conditional layout
function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:hallId" element={<BookHall />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booked-halls" element={<BookedHalls />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
