import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenteeRegistrationPage from "./pages/MenteeRegistrationPage";
import MentorRegistrationPage from "./pages/MentorRegistrationPage";
import MentorsPage from "./components/MentorsPage";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <NavBar user={user}/>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<WelcomePage />} />

            <Route path="/mentors-page" element={<MentorsPage user={user}/>} />
            <Route path="/register/mentor" element={<MentorRegistrationPage />} />
            <Route path="/register/mentee" element={<MenteeRegistrationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;