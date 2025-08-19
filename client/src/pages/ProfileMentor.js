import React, {useState} from "react"
import "./ProfileMentor.css"
import { authService } from '../api/authService';
import { Switch, FormControlLabel } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ProfileMentor = ({user, setUser}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    if (!user){
        return <p>Please log in to view this page.</p>;
    }
    if(user.role === 'mentee'){
        return <p>You have to be a mentor to view this page.</p>
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "role" || name === "email"){
            return;
        }
        if (name === "years_of_experience") {
            if (value === "" || /^[0-9]+$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "languages") {
            setFormData({ ...formData, languages: value.split(",").map(l => l.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setFormData({...formData, [name]: value});
    }

    const handleToggleChange = (event) => {
        setFormData({ ...formData, is_available: event.target.checked });
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                first_name: formData.first_name.trim() || user.first_name,
                last_name: formData.last_name.trim() || user.last_name,
                email: formData.email.trim() || user.email,
                phone_number: formData.phone_number.trim() || user.phone_number,
                linkedin_url: formData.linkedin_url.trim() || user.linkedin_url,
                bio: formData.bio.trim() || user.bio,
                years_of_experience: formData.years_of_experience !== ""
                    ? Math.max(Number(formData.years_of_experience), 0)
                    : user.years_of_experience,
                languages: formData.languages.length > 0 ? formData.languages : user.languages,
                is_available: formData.is_available !== undefined ? formData.is_available : user.is_available,
            };

            const updatedUser = await authService.updateProfile(updatedData);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.log("Error updating profile: ", error);
        }
    };

    const handleEditClick = () => {
        if (user){
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone_number: user.phone_number || "",
                linkedin_url: user.linkedin_url || "",
                bio: user.bio || "",
                years_of_experience: user.years_of_experience || 0,
                languages: user.languages || [],
                is_available: user.is_available !== undefined ? user.is_available : true
            });
            setIsEditing(true);
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
                    <div className="edit-names">
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
                    </div>
                ) : (
                    <h1>{user.first_name}  {user.last_name}</h1>
                )}
                <p className="profile-mentor-role">{user.role}</p>
            </div>
            <div className="profile-mentor-info">
                <h2>Contact Information</h2>
                {isEditing ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn:</label>
                            <input
                                type="text"
                                name="linkedin_url"
                                value={formData.linkedin_url}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Phone: </b>{user.phone_number}</p>
                        <p>
                            <b>LinkedIn: </b>
                            {user.linkedin_url ? (
                                <a 
                                    href={user.linkedin_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="linkedin-link"
                                >
                                    <LinkedInIcon style={{ fontSize: 20, color: '#0077b5' }} />
                                </a>
                            ) : (
                                <span style={{ color: '#999' }}>Not provided</span>
                            )}
                        </p>
                    </>
                )}
                
                <h2>Professional Info</h2>
                {isEditing ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label>Bio:</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Years of experience:</label>
                            <input
                                type="number"
                                name="years_of_experience"
                                value={formData.years_of_experience}
                                onChange={handleChange}
                                onKeyDown={(e) => {
                                    if (["-", "+", "e", "E"].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Languages:</label>
                            <input
                                type="text"
                                name="languages"
                                value={formData.languages.join(", ")}
                                onChange={(e) => {
                                    setFormData({...formData, languages: e.target.value.split(",").map(l => l.trim())});
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.is_available}
                                        onChange={handleToggleChange}
                                        color="primary"
                                    />
                                }
                                label="Available for Mentoring"
                            />
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p><b>Bio: </b> {user.bio}</p>
                        <p><b>Years of experience: </b>{user.years_of_experience}</p>
                        <p><b>Languages: </b>
                            {user.languages.join(", ")}
                        </p>
                        <p><b>Available for Mentoring: </b>
                            <span style={{ 
                                color: user.is_available ? '#4caf50' : '#f44336',
                                fontWeight: 'bold'
                            }}>
                                {user.is_available ? 'Yes' : 'No'}
                            </span>
                        </p>
                        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfileMentor;