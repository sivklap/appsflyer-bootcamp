import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenteeRegistrationPage from "./pages/MenteeRegistrationPage";
import MentorRegistrationPage from "./pages/MentorRegistrationPage";
import MentorsPage from "./pages/MentorsPage";
import NavBar from "./components/NavBar";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

import WelcomePage from "./pages/WelcomePage";
import "./App.css";
import ProfileMentor from "./pages/ProfileMentor";
import ProfileMentee from "./pages/ProfileMentee";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <NavBar user={user} setUser={setUser} />
        <div className="app-container">
          <Routes>
            {/* Default route goes to login */}
            <Route path="/" element={<WelcomePage user={user} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />

            {/* Your existing routes */}
            <Route path="/mentors" element={<MentorsPage user={user}/>} />
            <Route path="/register/mentor" element={<MentorRegistrationPage />} />
            <Route path="/register/mentee" element={<MenteeRegistrationPage />} />
            <Route path="/profile/mentor" element={<ProfileMentor user={user}/>} />
            <Route path="/profile/mentee" element={<ProfileMentee user={user}/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;