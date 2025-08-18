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
                        <img
                            src={
                                mentor.img && typeof mentor.img === 'string' && (mentor.img.startsWith('data:') || mentor.img.startsWith('iVBOR'))
                                    ? (mentor.img.startsWith('data:') ? mentor.img : `data:image/png;base64,${mentor.img}`)
                                    : (mentor.img && (typeof mentor.img === 'string' || typeof mentor.img === 'number'))
                                        ? `/images/avatars/avatar-${mentor.img}.png`
                                        : '/images/avatars/avatar-1.png'
                            }
                            alt="mentor-image"
                        />
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