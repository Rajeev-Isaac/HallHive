import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingId"); // Use bookingId, not hallId

  const [method, setMethod] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "", otp: "" });
  const [showCardFields, setShowCardFields] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleMethod = (m) => {
    setMethod(m);
    setShowCardFields(m === "card");
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleCash = async () => {
    await axios.post("http://localhost:5000/api/bookings/payment", {
      bookingId,
      paymentStatus: "pending",
      paymentMethod: "cash",
      paymentDetails: {}
    });
    alert("Booking successful! Please pay cash at the venue. Payment status: Pending.");
    navigate("/home");
  };

  const handleCard = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      alert("OTP sent: 123456 (demo)");
      return;
    }
    if (card.otp !== "123456") {
      alert("Invalid OTP");
      return;
    }
    await axios.post("http://localhost:5000/api/bookings/payment", {
      bookingId,
      paymentStatus: "success",
      paymentMethod: "card",
      paymentDetails: {
        number: card.number,
        name: card.name,
        expiry: card.expiry
      }
    });
    alert("Payment successful! Your booking is confirmed.");
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Payment Gateway</h2>
        <p>Choose your payment method:</p>
        <div style={{ marginBottom: 20 }}>
          <button style={styles.button} onClick={() => handleMethod("cash")}>Pay by Cash</button>
          <button style={{ ...styles.button, marginLeft: 10 }} onClick={() => handleMethod("card")}>Pay by Card</button>
        </div>
        {method === "cash" && (
          <button style={styles.button} onClick={handleCash}>Confirm Cash Payment</button>
        )}
        {showCardFields && (
          <form onSubmit={handleCard}>
            <input
              style={styles.input}
              name="number"
              placeholder="Card Number"
              maxLength={16}
              required
              value={card.number}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
              style={styles.input}
              name="name"
              placeholder="Cardholder Name"
              required
              value={card.name}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
              style={styles.input}
              name="expiry"
              placeholder="Expiry (MM/YY)"
              required
              value={card.expiry}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
              style={styles.input}
              name="cvv"
              placeholder="CVV"
              type="password"
              maxLength={4}
              required
              value={card.cvv}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            {otpSent && (
              <input
                style={styles.input}
                name="otp"
                placeholder="Enter OTP"
                required
                value={card.otp}
                onChange={handleCardChange}
              />
            )}
            <button type="submit" style={styles.button}>
              {otpSent ? "Finalize Payment" : "Send OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#4B0082",
    color: "#fff",
    padding: "12px 28px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px"
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px"
  }
};

export default Payment;