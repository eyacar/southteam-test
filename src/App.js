import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppBar from "./components/features/AppBar/AppBar";
import WelcomePage from "./components/features/WelcomePage/WelcomePage";
import UsersCards from "./components/features/users/UsersCards";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/results" element={<UsersCards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
