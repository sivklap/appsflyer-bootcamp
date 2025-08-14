import React from "react"
import Button from "@mui/material/Button";
import "./WelcomePage.css"

const WelcomePage = () => {
    return (
        <div className="welcome-page">
            <img src="/images/crown-logo.png" alt="Home Logo" className="crown-logo" />
            <h3>Connecting women to learn and grow together</h3>
            <p>Join a community, find mentors and grow your skills.</p>
            //TODO: make the button seen only if a user is not connected
            <Button
                className="welcome-log-in"
                variant="contained"
                href="/login"
            >
                Get started
            </Button>
        </div>
    )
}

export default WelcomePage;