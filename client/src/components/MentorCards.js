import React, {useState} from "react"
import MentorModal from "./MentorModal.js"
import "./MentorCards.css"

const MentorCards = ({mentors}) => {
    const [showMentorModal, setShowMentorModal] = useState(false);
    const [chosenMentor, setChosenMentor] = useState(null);
    // console.log(mentors)
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
                        <img src={mentor.imageUrl} alt="mentor-image" />
                        <h2>{mentor.firstName} {mentor.lastName}</h2>
                        <p>{mentor.codingLanguages.join(", ")}</p>
                    </div>
                ))}
            </div>

            {/* Single modal instance outside the map */}
            <MentorModal
                show={showMentorModal}
                mentor={chosenMentor}
                onClose={() => setShowMentorModal(false)}
            />
        </>
    )
}

export default MentorCards;