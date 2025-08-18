import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../public/css/Payment.css";
import { toast } from "react-toastify";

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
    toast("Booking successful! Please pay cash at the venue. Payment status: Pending.");

    navigate("/home");
  };

  const handleCard = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      toast("OTP sent: 123456 (demo)");
      return;
    }
    if (card.otp !== "123456") {
      toast.error("Invalid OTP");
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
    toast.success("Payment successful! Your booking is confirmed.");
    navigate("/home");
  };

  return (
    <div >
      
      <div className="pay-via">
        
        <h2>Payment Gateway</h2>
        <p>Choose your payment method:</p>
        <div >
          <button
            className={`pay-option${method === "cash" ? " selected-pay-option" : ""}`}
            onClick={() => handleMethod("cash")}
          >
            Pay by Cash
          </button>
          <button
            className={`pay-option${method === "card" ? " selected-pay-option" : ""}`}
            onClick={() => handleMethod("card")}
          >
            Pay by Card
          </button>
        </div>
        {method === "cash" && (
          <button className="pay-option" onClick={handleCash}>Confirm Cash Payment</button>
        )}
        {showCardFields && (
          <form className="card-form" onSubmit={handleCard}>
            <input
              name="number"
              placeholder="Card Number"
              maxLength={16}
              required
              value={card.number}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
              name="name"
              placeholder="Cardholder Name"
              required
              value={card.name}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
              name="expiry"
              placeholder="Expiry (MM/YY)"
              required
              value={card.expiry}
              onChange={handleCardChange}
              disabled={otpSent}
            />
            <input
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
                name="otp"
                placeholder="Enter OTP"
                required
                value={card.otp}
                onChange={handleCardChange}
              />
            )}
            <button className="sendOTP" type="submit" >
              {otpSent ? "Finalize Payment" : "Send OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


export default Payment;