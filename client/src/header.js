import React from "react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className={`header ${darkMode ? "header-dark" : "header-light"}`}>
      <span role="img" aria-label="angry face logo" className="logo">
        🤬
      </span>
      <h1 className="title">Angry Compiler</h1>
      <button
        onClick={toggleDarkMode}
        className={`toggle-btn ${darkMode ? "toggle-btn-dark" : "toggle-btn-light"}`}
        aria-label="Toggle light/dark mode"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
