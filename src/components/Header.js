import React from "react";

export default function Header({ theme, toggleTheme }) {
  return (
    <div className="udyam-headerbar">
      <div className="udyam-logo">Udyam</div>
      <div style={{display:"flex",alignItems:"center",gap:"19px"}}>
            <a
        href="/about"
        className="udyam-about-link"
        style={{
            color: "#fff", // Always white for visibility
            fontWeight: "500",
            fontSize: "16px",
            textDecoration: "none",
            letterSpacing: "1px"
        }}
        >
        About
        </a>

        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            fontSize: 25,
            cursor: "pointer",
            color: theme === "light" ? "#1976d2" : "#ffee80",
            opacity: 0.88,
            marginTop: "1px"
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}
