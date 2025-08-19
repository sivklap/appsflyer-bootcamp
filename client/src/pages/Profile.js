import React, { useState } from "react";
import AvatarUpload from "../components/auth/AvatarUpload";
import "./Profile.css";
import { authService } from '../api/authService';
import Button from '@mui/material/Button';
import { Navigate, useLocation } from "react-router-dom";


const Profile = ({ user, setUser, availableLanguages = [] }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isChangingAvatar, setIsChangingAvatar] = useState(false);
    const [avatarWarning, setAvatarWarning] = useState("");

    const location = useLocation();

    if (!user) return <p>Please log in to view this page.</p>;

    // Redirect /profile to the correct path based on role
    if (location.pathname === "/profile") {
        if (user.role === "mentor") return <Navigate to="/profile/mentor" replace />;
        if (user.role === "mentee") return <Navigate to="/profile/mentee" replace />;
    }

    // Optional: check if user role matches the path
    const pathRole = location.pathname.split("/")[2]; // "mentor" or "mentee"
    if (pathRole && pathRole !== user.role) {
        return <p>Access denied. You are not a {pathRole}.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "role" || name === "email") return;

        if (name === "years_of_experience") {
            if (value === "" || /^[0-9]+$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "languages") {
            setFormData({ ...formData, languages: value.split(",").map(l => l.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAvatarSelect = (avatarValue) => {
        setFormData(prev => ({ ...prev, img: String(avatarValue) }));
    };

    const handleAvatarFile = (file) => {
        if (!file) return;
        setFormData(prev => ({ ...prev, img: file }));
    };

    const handleLanguageToggle = (language) => {
        setFormData((prev) => {
            const isSelected = prev.languages.includes(language);
            return {
                ...prev,
                languages: isSelected
                    ? prev.languages.filter((l) => l !== language)
                    : [...prev.languages, language]
            };
        });
    };

    const handleSave = async () => {
        if (isChangingAvatar && formData.img === user.img) {
            setAvatarWarning("You opened avatar editor but didn't change your avatar. Cancel the avatar change.");
            return;
        }

        setAvatarWarning("");

        try {
            const updatedData = {
                first_name: formData.first_name.trim() || user.first_name,
                last_name: formData.last_name.trim() || user.last_name,
                email: formData.email.trim() || user.email,
                phone_number: formData.phone_number.trim() || user.phone_number,
                ...(formData.linkedin_url !== undefined && { linkedin_url: formData.linkedin_url.trim() || "" }),
                ...(formData.bio !== undefined && { bio: formData.bio.trim() || "" }),
                ...(formData.years_of_experience !== undefined && { years_of_experience: formData.years_of_experience !== "" ? Math.max(Number(formData.years_of_experience), 0) : 0 }),
                ...(formData.languages !== undefined && { languages: formData.languages.length > 0 ? formData.languages : [] }),
                ...(isChangingAvatar && { img: formData.img })
            };

            const updatedUser = await authService.updateProfile(updatedData);
            setUser(updatedUser);
            setIsEditing(false);
            setIsChangingAvatar(false);
        } catch (error) {
            console.log("Error updating profile: ", error);
        }
    };

    const handleEditClick = () => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone_number: user.phone_number || "",
                linkedin_url: user.linkedin_url || "",
                bio: user.bio || "",
                years_of_experience: user.years_of_experience || 0,
                languages: user.languages || [],
                img: user.img || ""
            });
            setIsEditing(true);
            setIsChangingAvatar(false);
        }
    };

    let imgValue = isEditing && isChangingAvatar ? formData.img || user.img : user.img;
    let imgSrc = user.img;

    if (imgValue) {
        if (imgValue instanceof File) {
            imgSrc = URL.createObjectURL(imgValue);
        } else if (typeof imgValue === "string") {
            imgSrc = imgValue.startsWith('data:') || imgValue.startsWith('iVBOR')
                ? imgValue.startsWith('data:') ? imgValue : `data:image/png;base64,${imgValue}`
                : `/images/avatars/avatar-${imgValue}.png`;
        } else if (typeof imgValue === "number") {
            imgSrc = `/images/avatars/avatar-${imgValue}.png`;
        }
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="avatar-change-wrapper">
                    <img src={imgSrc} alt={user.first_name} className="profile-avatar" />

                    {isEditing && (
                        <Button
                            variant="text"
                            sx={{ color: "#BB8588" }}
                            onClick={() => setIsChangingAvatar(prev => !prev)}
                        >
                            {isChangingAvatar ? "Cancel Avatar Change" : "Change Avatar"}
                        </Button>
                    )}

                    {isChangingAvatar && (
                        <div className="avatar-selection">
                            <span className="avatar-selection-label">Select an avatar or upload a photo</span>
                            <div className="avatar-grid">
                                {[1, 2, 3, 4].map(num => (
                                    <label key={num} className="avatar-option">
                                        <input
                                            type="radio"
                                            name="img"
                                            value={num}
                                            checked={typeof formData.img === "string" && formData.img === String(num)}
                                            onChange={() => handleAvatarSelect(String(num))}
                                        />
                                        <img src={`/images/avatars/avatar-${num}.png`} alt={`avatar-${num}`} className="avatar-img" />
                                    </label>
                                ))}
                            </div>
                            <AvatarUpload onFileSelect={handleAvatarFile} />
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="edit-names">
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>
                ) : (
                    <h1>{user.first_name} {user.last_name}</h1>
                )}

                <p className="profile-role">{user.role}</p>
            </div>

            <div className="profile-info">
                <h2>Contact Information</h2>
                {isEditing ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn:</label>
                            <input type="text" name="linkedin_url" value={formData.linkedin_url || ""} onChange={handleChange} />
                        </div>
                    </div>
                ) : (
                    <>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Phone:</b> {user.phone_number}</p>
                        {user.linkedin_url && (
                            <p><b>LinkedIn: </b><a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">{user.linkedin_url}</a></p>
                        )}
                    </>
                )}

                <h2>Professional Info</h2>
                {isEditing ? (
                    <div className="edit-form">
                        {/* Bio */}
                        <div className="form-group">
                            <label>Bio:</label>
                            <textarea name="bio" value={formData.bio || ""} onChange={handleChange} />
                        </div>

                        {/* Years of experience */}
                        <div className="form-group">
                            <label>Years of experience:</label>
                            <input
                                type="number"
                                name="years_of_experience"
                                value={formData.years_of_experience || 0}
                                onChange={handleChange}
                                onKeyDown={(e) => { if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault(); }}
                                min="0"
                                max="50"
                            />
                        </div>

                        {/* Languages */}
                        <div className="form-group">
                            <label>Languages:</label>
                            <div className="languages-grid">
                                {availableLanguages.map(lang => (
                                    <button
                                        key={lang}
                                        type="button"
                                        className={`language-btn ${formData.languages?.includes(lang) ? 'selected' : ''}`}
                                        onClick={() => handleLanguageToggle(lang)}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave}><span>Save</span></button>
                            <button className="cancel-btn" onClick={() => { setIsEditing(false); setIsChangingAvatar(false); }}><span>Cancel</span></button>
                        </div>
                        {avatarWarning && <p style={{ color: "red", marginTop: "6px" }}>{avatarWarning}</p>}
                    </div>
                ) : (
                    <>
                        {user.bio && <p><b>Bio:</b> {user.bio}</p>}
                        {user.years_of_experience !== undefined && <p><b>Years of experience:</b> {user.years_of_experience}</p>}
                        {user.languages && user.languages.length > 0 && <p><b>Languages:</b> {user.languages.join(", ")}</p>}
                        {!isEditing && <button className="edit-btn" onClick={handleEditClick}>Edit</button>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
