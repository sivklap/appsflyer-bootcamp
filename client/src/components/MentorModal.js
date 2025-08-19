import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import "./MentorModal.css"

const MentorModal = ({show, mentor, onClose}) => {
    if (!show){
        return null;
    }

    return (
        <div className="overlay">
            <div className="mentor-modal">
                <button className="close-button" onClick={onClose}>
                    <CloseIcon/>
                </button>
                <div className="mentor-modal-content">
                    <img
                        src={
                            mentor.img && typeof mentor.img === 'string' && (mentor.img.startsWith('data:') || mentor.img.startsWith('iVBOR'))
                                ? (mentor.img.startsWith('data:') ? mentor.img : `data:image/png;base64,${mentor.img}`)
                                : '/images/avatars/avatar-1.png'
                        }
                        alt="Mentor"
                        className="mentor-avatar"
                    />
                    <div className="mentor-modal-body">
                        <h1 className="mentor-name">{mentor.first_name} {mentor.last_name}</h1>
                        <h2 className="mentor-language">{mentor.languages.join(", ")}</h2>
                        {mentor.years_of_experience && (
                            <p className="mentor-experience">
                                {mentor.years_of_experience} {mentor.years_of_experience === 1 ? "year" : "years"} of experience
                            </p>
                        )}
                        <p className="mentor-bio">{mentor.bio}</p>

                        <div className="availability-indicator">
                            <div className={`availability-dot ${mentor.is_available ? 'available' : 'unavailable'}`}></div>
                            <span className="availability-text">
                                {mentor.is_available ? 'Available' : 'Not Available'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mentor-contact">
                    <h3>Contact {mentor.first_name}:</h3>
                    <div className="contact-icons">
                        <a href={`mailto:${mentor.email}`}><MailIcon /></a>
                        <a href={`tel:${mentor.phone_number}`}><PhoneIcon /></a>
                        <a href={mentor.linkedin_url} target="_blank" rel="noreferrer" className="linkedin-icon">
                            <LinkedInIcon fontSize="large" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorModal;