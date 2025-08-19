import React, {useState} from "react"
import "./SearchBar.css"

const SearchBar = ({mentors, onResults, setIsSearching}) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === ""){
            onResults(mentors);
            setIsSearching(false);
        } else {
            const filtered = mentors.filter((mentor) => {
                const fullName = (mentor.first_name + " " + mentor.last_name).toLowerCase();
                // const languages = (mentor.languages || []).map((l) => l.toLowerCase());
                return fullName.includes(value.toLowerCase());

            })
            onResults(filtered);
            setIsSearching(true);
        }

    }

    return (
        <div className="search-container">
            <input
                className = "search-bar"
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Search by name"
            />
        </div>
 

)
}

export default SearchBar;