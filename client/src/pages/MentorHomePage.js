import React, { useEffect } from "react"
import "./MentorHomePage.css"

const MentorHomePage = ({user}) => { 
  useEffect(() => {
    // Add canvas to DOM if not exists
    let canvas = document.getElementById("vanillaConfettiCanvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "vanillaConfettiCanvas";
      canvas.style.position = "fixed";
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = 1000;
      document.body.appendChild(canvas);
    }

    // Load the confetti script dynamically
    const script = document.createElement("script");
    script.src = "/vanillaConfetti.js";
    script.async = true;
    script.onload = () => {
      if (window.generateConfetti) {
        window.generateConfetti({
          quantity: 120,
          maxSize: 18,
          minSize: 8,
          colorsArray: ["#FFD700", "#FF69B4", "#4F46E5", "#D8A48F", "#fff"],
          velocity: 0.01,
          infiniteLoop: false,
          minOpacity: 0.7,
          maxOpacity: 1
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (canvas) canvas.remove();
      document.body.removeChild(script);
    };
  }, []);

    if (!user){
        return <p>Please log in to view this page.</p>;
    }
    
    return (
        <div className="mentor-home-page">
            <div className="mentor-home-content">
                <h1>Welcome, {user.first_name}!</h1>
                <div className="thank-you-message">
                    <h2>Thank you for being a mentor!</h2>
                    <p>Your expertise and guidance will help shape the future of our community.</p>
                    <p>We appreciate your commitment to sharing knowledge and empowering others.</p>
                </div>
                <div className="mentor-stats">
                    <div className="stat-card">
                        <h3>You're Making a Difference</h3>
                        <p>Your mentorship will help mentees grow and succeed in their careers.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorHomePage;
