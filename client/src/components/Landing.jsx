import React from "react";
import hallImage from "../public/RoyalWedding.jpg";
import { useNavigate } from "react-router-dom";
import "../public/css/Landing.css";

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
    <section
      className="lh"
      style={{ backgroundImage: `url(${hallImage})` }}
    >
      <div className="lo">
        <h2 className="lhd">
          <span className="lttl">HallHive</span>
        </h2>
        <p className="lsbhd">
          Find the <b>perfect</b> venue for every <b>celebration</b>.
        </p>
        <button onClick={handleBookClick} className="lbtn" style={{ maxWidth: 250 }}>
          Check out Halls
        </button>
        <div className="linf">
          <h3 className="linfh">
            <span>Why HallHive?</span>
          </h3>
          <ul className="lli">
            <li>
              Quickly browse and book function halls online through a smooth,{" "}
              <span className="lhi">user-friendly interface</span> — no phone calls or paperwork needed.
            </li>
            <li>
              Instantly check <span className="lhi">live availability</span> for each hall and date, ensuring you only book what’s actually free and ready.
            </li>
            <li>
              Separate, <span className="lhi">personalized dashboards</span> for customers and admins make booking, tracking, and managing venues clear and efficient.
            </li>
            <li>
              Book with confidence using our safe and <span className="lhi">integrated payment system</span> — confirm your reservation instantly without any follow-ups.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Landing;
