import React from "react";
import "./Team.css";

function Team() {
  return (
    <div className="team-container">
      <div className="team-header animate-fade-in">
        <h1>Our Project Team</h1>
        <p>
          This wildlife conservation project was developed by Divyam Garg and Kunal Malik, under the esteemed guidance of{" "}
          <strong>Dr. Saurabh Shanu</strong>, Assistant Professor, School of Computer Science.
        </p>
      </div>
      <div className="team-content">
        <p className="team-intro animate-fade-in">
          Meet the dedicated team behind our innovative platform for secure data management and wildlife research.
        </p>
        <div className="team-members">
          <div className="team-card animate-pulse">
            <img
              src="/..frontend/public/Assests/Divyam.jpg"
              alt="Divyam Garg"
            />
            <h2>Divyam Garg</h2>
            <p>Lead Developer</p>
          </div>
          <div className="team-card animate-pulse">
            <img
              src="C:\Users\ASUS\Desktop\minor 2\Wildlife\frontend\Assets\kunal.jpg"
              alt="Kunal Malik"
            />
            <h2>Kunal Malik</h2>
            <p>Frontend Specialist</p>
          </div>
          <div className="team-card animate-pulse">
            <img
              src="data:image/jpeg;base64,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"
              alt="Dr. Saurabh Shanu"
            />
            <h2>Dr. Saurabh Shanu</h2>
            <p>Project Mentor</p>
            <p>Assistant Professor<p>
            School of Computer Science</p>
            <p>
            UPES</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;