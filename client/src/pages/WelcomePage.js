import React from "react"
import Button from "@mui/material/Button";
import "./WelcomePage.css"

const WelcomePage = ({user}) => {
    return (
        <div className="welcome-page">
            <img src="/images/crown-logo.png" alt="Home Logo" className="crown-logo" />
            <h3>Connecting women to learn and grow together</h3>
            <p>Join a community, find mentors and grow your skills.</p>

            {!user ? (
                <Button
                    className="welcome-log-in"
                    variant="contained"
                    href="/login"
                >
                    Get started
                </Button>
            ) : (
                <Button
                    className="welcome-log-in"
                    variant="contained"
                    href={
                        user.role === 'mentee'
                            ? '/mentors-page'
                            : `/profile/${user.role}`
                    }
                >
                    {user.role === 'mentee'
                        ? 'Search mentors'
                        : 'Go to Profile'}
                </Button>
            )}


        </div>
    )
}

export default WelcomePage;