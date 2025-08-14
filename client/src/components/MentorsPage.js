import React, {useEffect, useState} from "react";
// import UserManagement from "./UserManagement";
import MentorCards from "./MentorCards";
import SearchBar from "./SearchBar";
import axios from "axios";

const MentorsPage = ({user}) => {

    const [mentors, setMentors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredMentors, setFilteredMentors] = useState(mentors);

    useEffect(() => {
        async function getMentors() {
            try{
                const res = await axios.get("/users/mentors");
                setMentors(res.data);
                console.log(mentors);
            } catch (err) {
                console.log("Error fetching mentors:", err);
            }
        }
        getMentors();
    }, [])
    // TODO: check if the user is mentor
  return (
      <div>
          <SearchBar mentors={mentors} onResults={setFilteredMentors} setIsSearching={setIsSearching} />
          <MentorCards mentors={isSearching ? filteredMentors : mentors} />
      </div>
  );
}

export default MentorsPage;
