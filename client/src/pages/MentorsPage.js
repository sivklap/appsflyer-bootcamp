import React, {useEffect, useState} from "react";
import MentorCards from "../components/MentorCards";
import SearchBar from "../components/SearchBar";
import FilterSortBar from "../components/FilterSortBar";
import axios from "axios";
import "./MentorsPage.css"

const MentorsPage = ({user, availableLanguages}) => {

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
    if (!user){
        return <p>Please log in to view this page.</p>;
    }
    else if(user.role !== "mentee"){
        return <p>You have to be a mentee to see this page.</p>
    }
  return (
      <div className="mentors-page">
          <h1>Find your mentor</h1>
          <SearchBar mentors={mentors} onResults={setFilteredMentors} setIsSearching={setIsSearching} />
          <div className="mentors-page-content">
              <FilterSortBar mentors={mentors} availableLanguages={availableLanguages} setIsSearching={setIsSearching} onResults={setFilteredMentors} />
              <MentorCards mentors={isSearching ? filteredMentors : mentors} />
          </div>

      </div>
  );
}

export default MentorsPage;
