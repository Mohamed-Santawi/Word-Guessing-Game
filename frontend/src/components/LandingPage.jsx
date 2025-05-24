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
    <div>
      <h1>Welcome to the Word Guessing Game</h1>
      <p>
        Rules: Guess the word by entering letters or the full word. You have 6
        attempts. Use hints sparingly as they affect your score!
      </p>
      <div className="mb-3">
        <label className="form-label">Nickname</label>
        <input
          type="text"
          className="form-control"
          value={localNickname}
          onChange={(e) => setLocalNickname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
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
      <button className="btn btn-primary" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}

export default LandingPage;
