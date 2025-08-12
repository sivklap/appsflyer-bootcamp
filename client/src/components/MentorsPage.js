import React, {useEffect, useState} from "react";
// import UserManagement from "./UserManagement";
import MentorCards from "./MentorCards";
import SearchBar from "./SearchBar";
import axios from "axios";

const MentorsPage = () => {

    const [mentors, setMentors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredMentors, setFilteredMentors] = useState(mentors);

    useEffect(() => {
        async function getMentors() {
            try{
                const res = await axios.get("/api/users/mentors");
                // console.log(res.data);
                setMentors(res.data);
                // console.log(mentors);
            } catch (err) {
                console.log("Error fetching mentors:", err);
            }
        }
        getMentors();
    }, [])

  return (
      <div>
          <SearchBar mentors={mentors} onResults={setFilteredMentors} setIsSearching={setIsSearching} />
          <MentorCards mentors={isSearching ? filteredMentors : mentors} />
      </div>
  );
}

export default MentorsPage;
