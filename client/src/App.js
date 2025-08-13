import React from "react";
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
            {/* Default route goes to login */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Your existing routes */}
            <Route path="/mentors-page" element={<MentorsPage user={user}/>} />
            <Route path="/register/mentor" element={<MentorRegistrationPage />} />
            <Route path="/register/mentee" element={<MenteeRegistrationPage />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;