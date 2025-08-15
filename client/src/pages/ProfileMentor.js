import React from "react"
import "./ProfileMentor.css"

const ProfileMentor = ({user}) => {
    if (!user){
        return <p>Please log in to view this profile.</p>;
    }
    return (
        <div className="profile-mentor-page">
            <div className="profile-mentor-header">
                <img
                    src={`/images/avatars/avatar-${user.img}.png`}
                    alt={user.first_name}
                    className="profile-mentor-avatar"
                />
                <h1>{user.first_name}  {user.last_name}</h1>
                <p className="profile-mentor-role">{user.role}</p>
            </div>
            <div className="profile-mentor-info">
                <h2>Contact Information</h2>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone: </b>{user.phone_number}</p>
                <p>
                    <b>LinkedIn: {" "}</b>
                    <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">{user.linkedin_url}</a>
                </p>
                <h2>Professional Info</h2>
                <p><b>Bio: </b> {user.bio}</p>
                <p><b>Years of experience: </b>{user.years_of_experience}</p>
                <p><b>Language: </b>
                    {user.languages.join(", ")}
                </p>
            </div>
        </div>
    )
}

export default ProfileMentor;