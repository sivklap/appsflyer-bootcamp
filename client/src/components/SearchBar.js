import React, {useState} from "react"
import "./SearchBar.css"

const SearchBar = ({mentors, onResults}) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        const filtered = mentors.filter((mentor) => {
            const fullName = (mentor.first_name + " " + mentor.last_name).toLowerCase();
            const languages = mentor.languages.map((l) => l.toLowerCase());
            return fullName.include(value) || languages.some((l) => l.includes(value));
        })
        onResults(filtered);
    }

    return (
        <div>
            <input
                className = "search-bar"
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Search by name or language"
            />
        </div>


)
}

export default SearchBar;