import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UdyamStep1 from "./components/UdyamStep1";
import UdyamStep2 from "./components/UdyamStep2";
import AboutPage from "./components/AboutPage";

function App() {
  const [theme, setTheme] = useState("light");
  const [step, setStep] = useState(1);
  const [aadhaarData, setAadhaarData] = useState(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      {/* App header with Udyam (left), About and sun/moon button (right) */}
      <Header theme={theme} toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
      
      <Routes>
        {/* Main form page */}
        <Route
          path="/"
          element={
            <div>
              {/* Step indicator below the header */}
              <div style={{ display: "flex", justifyContent: "center", margin: "32px 0 0 0" }}>
                <span className="udyam-step-dot" style={{ background: step === 1 ? "#1976d2" : "#e3ebf5" }}></span>
                <span className="udyam-step-dot" style={{ background: step === 2 ? "#1976d2" : "#e3ebf5" }}></span>
              </div>
              {/* Step forms */}
              {step === 1 ? (
                <UdyamStep1
                  onAadhaarValidated={data => {
                    setStep(2);
                    setAadhaarData(data); // send full form data to step 2
                  }}
                  theme={theme}
                />
              ) : (
                <UdyamStep2 aadhaarData={aadhaarData} theme={theme} />
              )}
            </div>
          }
        />
        {/* About page route */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
