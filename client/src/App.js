import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";


function App() {
    return (
        <Router>
            <div className="app">
                <NavBar/>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <HomePage />

                            </>
                        } />
                    </Routes>
                </div>

            </div>

        </Router>
    );
}

export default App;
