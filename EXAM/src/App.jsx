import React from "react";
import { useState } from "react";
import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Fix: Use default import for CommonJS
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";

// Import Pages
import Check from "./pages/Check.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Lotto from "./pages/Bet.jsx";
import Balance from "./pages/Balance.jsx";
import Account from "./pages/Account.jsx";
import History from "./pages/History.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* Routes Section */}
        <Route path="/" element={<Check />} />
        <Route path="/minute-lotto" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lotto" element={<Lotto />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
