import React, {useState} from "react"
import MentorModal from "./MentorModal.js"
import "./MentorCards.css"

const MentorCards = ({mentors}) => {
    const [showMentorModal, setShowMentorModal] = useState(false);
    const [chosenMentor, setChosenMentor] = useState(null);
    return (
        <>
            <div className="all-mentor-cards">
                {mentors.map((mentor) => (
                    <div
                        className="mentor-card"
                        key={mentor._id}
                        onClick={() => {
                            setShowMentorModal(true);
                            setChosenMentor(mentor);
                        }}
                    >
                        <img src={`images/avatars/avatar-${mentor.img}.png`} alt="mentor-image" />
                        <h2>{mentor.first_name} {mentor.last_name}</h2>
                        <p>{mentor.languages.join(", ")}</p>
                    </div>
                ))}
            </div>

            <MentorModal
                show={showMentorModal}
                mentor={chosenMentor}
                onClose={() => setShowMentorModal(false)}
            />
        </>
    )
}

export default MentorCards;