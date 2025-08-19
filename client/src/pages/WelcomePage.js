import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import "./WelcomePage.css"

const WelcomePage = ({user}) => {
   useEffect(() => {
   setTimeout(() => {
    const script = document.createElement("script");
    script.src = "/mouseConfetti.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, 0);
}, []);
    return (
        <div className="welcome-page">
            <canvas
                id="confetti-canvas"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    pointerEvents: "none",
                    zIndex: 1000
                }}
            ></canvas>
            <img src="/images/crown-logo.png" alt="Home Logo" className="crown-logo" />
            <h3>Connecting women to learn and grow together</h3>

            {!user ? (
                <>
                    <p>Join a community, find mentors and grow your skills.</p>
                    <Button
                        className="welcome-log-in"
                        variant="contained"
                        href="/login"
                    >
                        Get started
                    </Button>
                </>

            ) : (
                <>
                    <p>Welcome, {user.first_name}!</p>
                    <Button
                        className="welcome-log-in"
                        variant="contained"
                        href={
                            user.role === 'mentee'
                                ? '/mentors'
                                : `/profile/${user.role}`
                        }
                    >
                        {user.role === 'mentee'
                            ? 'Search mentors'
                            : 'Go to Profile'}
                    </Button>
                </>

            )}


        </div>
    )
}

export default WelcomePage;