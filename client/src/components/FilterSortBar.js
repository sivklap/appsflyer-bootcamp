import React, {useState, useEffect} from "react"
import "./FilterSortBar.css"
import { Slider, Button, Checkbox, FormControlLabel} from "@mui/material";


const FilterSortBar = ({mentors, availableLanguages, setIsSearching, onResults}) => {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [minYears, setMinYears] = useState(0);
    const [onlyAvailable, setOnlyAvailable] = useState(false);

    useEffect(() => {
        let filteredMentors = [...mentors];

        // filter by selected language
        if (selectedLanguages.length > 0) {
            filteredMentors = filteredMentors.filter((m) => (
                (m.languages || []).some((lang) => selectedLanguages.includes(lang))
            ));
        }

        // filter by years of experience
        if (minYears > 0) {
            filteredMentors = filteredMentors.filter(
                (m) => (m.years_of_experience || 0) >= minYears
            );
        }

        if (onlyAvailable) {
            filteredMentors = filteredMentors.filter((m) => m.is_available)
        }

        onResults(filteredMentors);
        setIsSearching(selectedLanguages.length > 0 || minYears > 0 || onlyAvailable);
    }, [selectedLanguages, minYears, onlyAvailable, mentors, onResults, setIsSearching]);

    const toggleLanguage = (lang) => {
        setSelectedLanguages((prev) =>
            prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
        );
    };

    const handleSliderChange = (event, newValue) => {
        setMinYears(newValue);
    }

    const handleAvailabilityChange = (event) => {
        setOnlyAvailable(event.target.checked);
    }

    const clearAll = () => {
        setSelectedLanguages([]);
        setMinYears(0);
        setOnlyAvailable(false);
        onResults(mentors);
        setIsSearching(false);
    };

    return (
        <div className="filter-sort-bar">

            <div className="filter-header">
                <h3>Filter & Sort</h3>
                <Button
                    size="small"
                    variant="text"
                    onClick={clearAll}
                    disabled={selectedLanguages.length === 0 && minYears === 0 && !onlyAvailable}
                    sx={{ color: "#BB8588" }}
                >
                    Clear
                </Button>
            </div>


            <div className="filter-section">
                <FormControlLabel
                    className="availability-checkbox"
                    control={
                        <Checkbox
                            checked={onlyAvailable}
                            onChange={handleAvailabilityChange}
                            sx={{ color: "#BB8588" }}
                        />
                    }
                    label="Show only available mentors"
                />
            </div>

            <div className="filter-section">
                <h4>Languages & Technologies</h4>
                <ul className="language-list">
                    {availableLanguages.map((lang) => (
                        <li key={lang}>
                            <Button
                                className="language-btn"
                                variant={selectedLanguages.includes(lang) ? "contained": "outlined"}
                                fullWidth
                                onClick={() => toggleLanguage(lang)}

                            >
                                {lang}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-section">
                <h4>Years of Experience</h4>
                <Slider
                    classes={{
                        root: "slider-root",
                        track: "slider-track",
                        rail: "slider-rail",
                    }}                    value={minYears}
                    min={0}
                    max={20}
                    step={1}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                />
                <p>{minYears}+ years</p>
            </div>

        </div>
    );

}

export default FilterSortBar;