import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorsPage from "./pages/MentorsPage";
import NavBar from "./components/NavBar";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import WelcomePage from "./pages/WelcomePage";
import Profile from "./pages/Profile";

import MentorHomePage from "./pages/MentorHomePage";
import { authService, setUserStateCallback } from "./api/authService";
import Footer from "./components/Footer";
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
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar user={user} />
        <div className="app-container" style={{ flex: 1 }}>
          <Routes>
            {/* Default route goes to login */}
            <Route path="/" element={<WelcomePage user={user} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm availableLanguages={availableLanguages} />} />

            <Route path="/mentors" element={<MentorsPage user={user} availableLanguages={availableLanguages} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} availableLanguages={availableLanguages} />} />
            <Route path="/profile/:role" element={<Profile user={user} setUser={setUser} availableLanguages={availableLanguages} />} />

            <Route path="/mentor-home" element={<MentorHomePage user={user}/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;