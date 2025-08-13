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
                    <img src={`avatars/avatar-${mentor.image}.png`} alt="Mentor" className="mentor-avatar" />
                    <div className="mentor-modal-body">
                        <a href={mentor.linkedinUrl} target="_blank" rel="noreferrer" className="linkedin-icon">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <h1 className="mentor-name">{mentor.firstName} {mentor.lastName}</h1>
                        <h2 className="mentor-language">{mentor.codingLanguages.join(", ")}</h2>
                        <p>{mentor.bio}</p>
                    </div>
                </div>

                <div className="mentor-contact">
                    <h3>Contact {mentor.firstName}</h3>
                    <div className="contact-icons">
                        <a href={`mailto:${mentor.email}`}><MailIcon /></a>
                        <a href={`tel:${mentor.phone}`}><PhoneIcon /></a>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default MentorModal;