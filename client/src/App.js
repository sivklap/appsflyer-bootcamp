import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MenteeRegistrationPage from "./pages/MenteeRegistrationPage";
// import MentorRegistrationPage from "./pages/MentorRegistrationPage";
import MentorsPage from "./pages/MentorsPage";
import NavBar from "./components/NavBar";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

import WelcomePage from "./pages/WelcomePage";
import "./App.css";
import ProfileMentor from "./pages/ProfileMentor";
import ProfileMentee from "./pages/ProfileMentee";
import MentorHomePage from "./pages/MentorHomePage";
import { authService, setUserStateCallback } from "./api/authService";

function App() {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage on app load
  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    
    // Set up callback for auth service to update user state
    setUserStateCallback(setUser);
  }, []);
  const availableLanguages = ['JavaScript', 'React', 'Python', 'Node.js', 'Java', 'C#', 'C++', 'HTML'];

  return (
    <Router>
      <div className="app">
        <NavBar user={user} />
        <div className="app-container">
          <Routes>
            {/* Default route goes to login */}
            <Route path="/" element={<WelcomePage user={user} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm availableLanguages={availableLanguages} />} />

            <Route path="/mentors" element={<MentorsPage user={user} availableLanguages={availableLanguages} />} />
            {/*<Route path="/register/mentor" element={<MentorRegistrationPage />} />*/}
            {/*<Route path="/register/mentee" element={<MenteeRegistrationPage />} />*/}
            <Route path="/profile/mentor" element={<ProfileMentor user={user} setUser={setUser} />} />
            <Route path="/profile/mentee" element={<ProfileMentee user={user}/>} />
            <Route path="/mentor-home" element={<MentorHomePage user={user}/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;