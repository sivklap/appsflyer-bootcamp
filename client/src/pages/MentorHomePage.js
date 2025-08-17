import React from "react"
import "./MentorHomePage.css"

const MentorHomePage = ({user}) => {
    if (!user){
        return <p>Please log in to view this page.</p>;
    }
    
    return (
        <div className="mentor-home-page">
            <div className="mentor-home-content">
                <h1>Welcome, {user.first_name}!</h1>
                <div className="thank-you-message">
                    <h2>Thank you for being a mentor! 👑</h2>
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
