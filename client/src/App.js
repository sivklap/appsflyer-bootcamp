import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenteeRegistrationPage from "./pages/MenteeRegistrationPage";
import MentorRegistrationPage from "./pages/MentorRegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register/mentor"
          element={<MentorRegistrationPage />}
        />
        <Route
          path="/register/mentee"
          element={<MenteeRegistrationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
