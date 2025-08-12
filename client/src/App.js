import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenteeRegistrationPage from "./pages/MenteeRegistrationPage";
import MentorRegistrationPage from "./pages/MentorRegistrationPage";
import MentorsPage from "./components/MentorsPage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/mentors-page" element={<MentorsPage />} />
            <Route path="/register/mentor" element={<MentorRegistrationPage />} />
            <Route path="/register/mentee" element={<MenteeRegistrationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;