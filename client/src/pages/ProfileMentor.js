import React, {useState} from "react"
import "./ProfileMentor.css"
import axios from "axios";

const ProfileMentor = ({user, setUser}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    if (!user){
        return <p>Please log in to view this profile.</p>;
    }
    if(user.role === 'mentee'){
        return <p>You have to be a mentor to see this</p>
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "role" || name === "email"){
            return;
        }
        setFormData({...formData, [name]: value});
    }

    // this is not working
    const handleSave = async (e) => {
        try {
            const res = await axios.patch(`/auth/update-profile`, formData);
            setUser(res.data);
            setIsEditing(false);
        } catch (error) {
            console.log("Error updating profile: ", error);
        }
    }

    return (
        <div className="profile-mentor-page">
            <div className="profile-mentor-header">
                <img
                    src={`/images/avatars/avatar-${user.img}.png`}
                    alt={user.first_name}
                    className="profile-mentor-avatar"
                />
                { isEditing ? (
                    <>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <h1>{user.first_name}  {user.last_name}</h1>
                )}
                <p className="profile-mentor-role">{user.role}</p>
            </div>
            <div className="profile-mentor-info">
                <h2>Contact Information</h2>
                {isEditing ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Phone: </b>{user.phone_number}</p>
                        <p>
                            <b>LinkedIn: {" "}</b>
                            <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">{user.linkedin_url}</a>
                        </p>
                    </>

                )}
                <h2>Professional Info</h2>
                {isEditing ? (
                    <>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="years_of_experience"
                            value={formData.years_of_experience}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="languages"
                            value={formData.languages.join(", ")}
                            onChange={(e) => {
                                setFormData({...formData, languages: e.target.value.split(",").map(l => l.trime())});
                            }}
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <p><b>Bio: </b> {user.bio}</p>
                        <p><b>Years of experience: </b>{user.years_of_experience}</p>
                        <p><b>Language: </b>
                            {user.languages.join(", ")}
                        </p>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </>
                )}


            </div>
        </div>
    )
}

export default ProfileMentor;