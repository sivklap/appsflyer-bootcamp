// import React, {useState, useEffect} from "react"
// import "./FilterSortBar.css"
//
// const FilterSortBar = ({mentors, availableLanguages, setIsSearching, onResults}) => {
//     const [selectedLanguages, setSelectedLanguages] = useState([]);
//     const [sortBy, setSortBy] = useState("");
//
//     useEffect(() => {
//         let filteredMentors = [...mentors];
//
//         // filter by selected language
//         if (selectedLanguages.length > 0) {
//             filteredMentors = filteredMentors.filter((m) => (
//                 (m.languages || []).some((lang) => selectedLanguages.includes(lang))
//             ));
//         }
//
//         // sorting
//         if (sortBy === 'name'){
//             filteredMentors.sort((a, b) =>
//                 (a.first_name + " " + a.last_name).localeCompare(b.first_name + " " + b.last_name)
//             );
//         } else if (sortBy === 'experience'){
//             filteredMentors.sort((a, b) => (b.years_experience || 0) - (a.years_experience || 0));
//         }
//
//         onResults(filteredMentors);
//         setIsSearching(selectedLanguages.length > 0 || sortBy !== "");
//     }, [selectedLanguages, sortBy, mentors]);
//
//     const toggleLanguage = (lang) => {
//         setSelectedLanguages((prev) =>
//             prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
//         );
//     };
//
//     const clearAll = () => {
//         setSelectedLanguages([]);
//         setSortBy("");
//         onResults(mentors);
//         setIsSearching(false);
//     };
//
//     return (
//         <div className="filtered-sort-bar">
//             {/* language filter */}
//             <div>
//                 <label>Filter by language:</label>
//                 <select onChange={handleLanguageChange}>
//                     <option value="">--Select language --</option>
//                     {availableLanguages.map(lang => (
//                         <option key={lang} value={lang}>
//                             {lang}
//                         </option>
//                     ))}
//                 </select>
//                 <div className="selected-languages">
//                     {selectedLanguages.map((lang) => (
//                         <span key={lang} className="tag">{lang}</span>
//                     ))}
//                 </div>
//             </div>
//
//             {/* sort dropdown */}
//             <div>
//                 <label>Sort by:</label>
//                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                     <option value="">--None--</option>
//                     <option value="name">Name</option>
//                     <option value="experience">Years of Experience</option>
//                 </select>
//             </div>
//         </div>
//     )
// }
//
// export default FilterSortBar;