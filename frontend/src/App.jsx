// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GameScreen from "./components/GameScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import WordManagementScreen from "./components/WordManagementScreen";
import AboutPage from "./components/AboutPage";
import { API_URL } from "./config";

/**
 * Main App component with navigation and routing.
 */
function App() {
  const [nickname, setNickname] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Fetch categories from API on mount
  useEffect(() => {
    fetch(`${API_URL}/api/words/categories`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Server unavailable")
      )
      .then((data) => setCategories(data))
      .catch(() =>
        setError("Cannot connect to server. Please try again later.")
      );
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Word Guessing Game
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <span>&#10005;</span> // Unicode X icon
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/game"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Game
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/leaderboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/manage"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Word Management
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4 flex-grow-1">
        {error && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Error</h5>
                </div>
                <div className="modal-body">
                  <p>{error}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => setError("")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                categories={categories}
                setNickname={setNickname}
                setError={setError}
              />
            }
          />
          <Route
            path="/game"
            element={
              nickname ? (
                <GameScreen nickname={nickname} setError={setError} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route
            path="/manage"
            element={<WordManagementScreen setError={setError} />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
