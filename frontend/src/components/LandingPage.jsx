// src/components/LandingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

/**
 * Landing page with game rules, nickname input, and category selector.
 */
function LandingPage({ categories, setNickname, setError }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [localNickname, setLocalNickname] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!localNickname || !selectedCategory) {
      setError("Please enter a nickname and select a category.");
      return;
    }
    fetch(`${API_URL}/api/words/random?category=${selectedCategory}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("No words available")
      )
      .then((data) => {
        if (data.word) {
          setNickname(localNickname);
          navigate("/game", { state: { wordEntry: data } });
        } else {
          setError("No words available in this category.");
        }
      })
      .catch(() => setError("Cannot connect to server or no words available."));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">
                Welcome to the Word Guessing Game
              </h1>
              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">Rules:</h5>
                <ul className="mb-0">
                  <li>Guess the word by entering letters or the full word</li>
                  <li>You have 6 attempts</li>
                  <li>Use hints sparingly as they affect your score!</li>
                </ul>
              </div>
              <div className="mb-3">
                <label className="form-label">Nickname</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={localNickname}
                  onChange={(e) => setLocalNickname(e.target.value)}
                  placeholder="Enter your nickname..."
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Category</label>
                <select
                  className="form-select form-select-lg"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleStart}
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
