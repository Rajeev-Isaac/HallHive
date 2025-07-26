import React from "react";
import hallImage from "../public/RoyalWedding.jpg";
import { Link, useNavigate } from "react-router-dom";
import './header.css';

function Landing() {
  const navigate = useNavigate();

  const handleBookClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  };

  return (
    <section style={styles.container}>
      <div style={{ ...styles.hero, backgroundImage: `url(${hallImage})` }}>
        <div style={styles.overlay}>
          <h2 style={styles.heading}>

            <br />
            <span style={{ color: "#D8BE90", fontFamily: "Playwrite AU QLD, cursive", fontSize: "5rem" }}>HallHive</span>
          </h2>
          <p style={styles.subheading}>
            Find the <b>perfect</b> venue for every <b>celebration</b>.
          </p>
          <button onClick={handleBookClick} className="logout-btn">
            Check out Halls
          </button>
        
      

          <div style={styles.info}>
            <h3 style={styles.infoHeading}> <span style={{ fontFamily: "Playwrite AU QLD, cursive", }}>Why HallHive?</span></h3>
            <ul style={styles.list}>
              <li>
                Quickly browse and book function halls online through a smooth, <span style={{ fontSize: "1.2rem", fontFamily: "Playwrite AU QLD, cursive", fontWeight: "bold" }}>user-friendly interface</span> — no phone calls or paperwork needed.
              </li>
              <li>
                Instantly check <span style={{ fontSize: "1.2rem", fontFamily: "Playwrite AU QLD, cursive", fontWeight: "bold", }}>live availability</span> for each hall and date, ensuring you only book what’s actually free and ready.
              </li>
              <li>
                Separate, <span style={{ fontSize: "1.2rem", fontFamily: "Playwrite AU QLD, cursive", fontWeight: "bold", }}> personalized dashboards</span> for customers and admins make booking, tracking, and managing venues clear and efficient.
              </li>
              <li>
                Book with confidence using our safe and <span style={{ fontSize: "1.2rem", fontFamily: "Playwrite AU QLD, cursive", fontWeight: "bold", }}>integrated payment system</span> — confirm your reservation instantly without any follow-ups.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
  //   minHeight: "100vh",
  //   width: "85vw",
  //   margin: 0,
  //   padding: 0,
  //   boxSizing: "border-box",
  //   fontFamily: "Segoe UI, Arial, sans-serif",
  //   background: "#f4f4f4",
  },
  hero: { 
    minHeight: "160vh",
    width: "99.8vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    marginTop: "-80vh",
    background: "#81460AA6",
    padding: "60px 30px 50px 30px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    textAlign: "center",
    width: "60vw",
    height: "50vh",
    color: "#fff",
  },
  heading: {
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
    fontSize: "3rem",
    fontWeight: 700,
    marginTop: "-75px",
    marginBottom: "18px",
    letterSpacing: "1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.18)",
  },
  subheading: {
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
    fontSize: "1.7rem",
    marginBottom: "32px",
    color: "#D8BE90",
    textShadow: "0 1px 4px rgba(0,0,0,0.12)",
  },
  button: {
    display: "inline-block",
    padding: "14px 38px",
    background: "linear-gradient(90deg, #7b2ff2 0%, #f357a8 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "1.1rem",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 4px 16px rgba(123,47,242,0.18)",
    transition: "background 0.2s, transform 0.2s",
    cursor: "pointer",
    marginTop: "10px",
  },
  info: {
    fontFamily: "DM Sans, sans-serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
    fontSize: "3rem",
    marginTop: "30vh",
    marginLeft: "-1.6vw",
    background: "#D8BE90A6",
    padding: "32px 24px",
    //borderRadius: "12px",
    textAlign: "left",
    width: "60vw",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  infoHeading: {
    fontSize: "1.6rem",
    color: "#81460A",
    marginBottom: "18px",
    fontWeight: 600,
  },
  list: {
    color: "#81460A",
    fontSize: "1.5rem",
    lineHeight: 1.7,
    paddingLeft: "18px",
  },
};

export default Landing;
