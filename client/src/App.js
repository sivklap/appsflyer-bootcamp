import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm.jsx";
import { fieldsConfig } from "./config/fieldsConfig";

function App() {
  const handleFormSubmit = (data) => {
    console.log("נתוני הטופס:", data);
    alert("הטופס נשלח בהצלחה!");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/register/mentor"
          element={<RegistrationForm type="mentor" />}
        />
        <Route
          path="/register/mentee"
          element={<RegistrationForm type="mentee" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
