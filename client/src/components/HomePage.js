import React, {useState} from "react";
// import UserManagement from "./UserManagement";
import MentorCards from "./MentorCards";
import SearchBar from "./SearchBar";

const HomePage = () => {
    const [mentors, setMentors] = useState([
        {
            first_name: "John",
            last_name: "Doe",
            languages: ["JavaScript", "Python"],
            yearsOfExperience: 5,
            bio: "Full-stack developer passionate about mentoring new coders.",
            email: "john.doe@example.com",
            phoneNumber: "+1 555-123-4567",
            linkedin_url: "https://www.linkedin.com/in/johndoe",
            img: "/avatar-1.png"

        },
        {
            first_name: "Jane",
            last_name: "Smith",
            languages: ["Java", "C#"],
            yearsOfExperience: 8,
            bio: "Backend engineer with a love for clean code and architecture.",
            email: "jane.smith@example.com",
            phoneNumber: "+1 555-987-6543",
            linkedin_url: "https://www.linkedin.com/in/janesmith",
            img: "/avatar-2.png"

        },
        {
            first_name: "Alice",
            last_name: "Brown",
            languages: ["Java", "C#"],
            yearsOfExperience: 7,
            bio: "Backend engineer with a love for clean code and efficient systems.",
            email: "alice.brown@example.com",
            phoneNumber: "+1 555-234-5678",
            linkedin_url: "https://www.linkedin.com/in/alicebrown",
            img: "/avatar-2.png"
        },
        {
            first_name: "Michael",
            last_name: "Green",
            languages: ["TypeScript", "Go"],
            yearsOfExperience: 6,
            bio: "DevOps enthusiast who enjoys building scalable cloud solutions.",
            email: "michael.green@example.com",
            phoneNumber: "+1 555-345-6789",
            linkedin_url: "https://www.linkedin.com/in/michaelgreen",
            img: "/avatar-1.png"
        },
        {
            first_name: "Sofia",
            last_name: "Martinez",
            languages: ["Ruby", "Python"],
            yearsOfExperience: 4,
            bio: "Full-stack developer focused on user-friendly web applications.",
            email: "sofia.martinez@example.com",
            phoneNumber: "+1 555-456-7890",
            linkedin_url: "https://www.linkedin.com/in/sofiamartinez",
            img: "/avatar-2.png"
        },
        {
            first_name: "David",
            last_name: "Lee",
            languages: ["PHP", "JavaScript"],
            yearsOfExperience: 9,
            bio: "Software architect with a passion for mentoring and knowledge sharing.",
            email: "david.lee@example.com",
            phoneNumber: "+1 555-567-8901",
            linkedin_url: "https://www.linkedin.com/in/davidlee",
            img: "/avatar-1.png"
        }
    ]);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredMentors, setFilteredMentors] = useState(mentors);

  return (
      <div>
          <SearchBar mentors={mentors} onResults={setFilteredMentors} setIsSearching={setIsSearching} />
          <MentorCards mentors={isSearching ? filteredMentors : filteredMentors} />
      </div>
  );
}

export default HomePage;
