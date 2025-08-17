import React from "react"
import "./ProfileMentee.css"

const ProfileMentee = ({user}) => {
    if (!user){
        return <p>Please log in to view this profile.</p>;
    }
    if(user.role === 'mentor'){
        return <p>You have to be a mentee to see this</p>
    }
    return (
        <div className="profile-mentee-page">
            <div className="profile-mentee-header">
                {user.img && (
                    <img
                        src={`/images/avatars/avatar-${user.img}.png`}
                        alt={user.first_name}
                        className="profile-mentee-avatar"
                    />
                )}
                <h1>{user.first_name}  {user.last_name}</h1>
                <p className="profile-mentee-role">{user.role}</p>
            </div>
            <div className="profile-mentee-info">
                <h2>Contact Information</h2>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone: </b>{user.phone_number}</p>

                {user.bio && (
                    <>
                        <h2>Professional Info</h2>
                        <p>
                            <b>Bio: </b> {user.bio}
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfileMentee;