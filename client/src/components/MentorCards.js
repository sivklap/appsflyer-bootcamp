import React, {useState} from "react"
import MentorModal from "./MentorModal.js"
import "./MentorCards.css"
import Avatar from '@mui/material/Avatar';

const MentorCards = ({mentors}) => {
    const [showMentorModal, setShowMentorModal] = useState(false);
    return (
        <div className="all-mentor-cards">
            {
                mentors.map((mentor) => {
                    return (
                        <>
                            <div className="mentor-card" onClick={() => setShowMentorModal(true)}>
                                <img src={mentor.img} alt="mentor-image" />
                                <h2>{mentor.first_name + " " + mentor.last_name}</h2>
                                <p>{mentor.languages.join(", ")}</p>
                            </div>
                            <MentorModal show={showMentorModal} mentor={mentor} onClose={() => setShowMentorModal(false)}/>
                        </>
                    )
                })
            }
        </div>
    )
}

export default MentorCards;