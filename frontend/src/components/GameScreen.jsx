/* eslint-disable no-unused-vars */
// src/components/GameScreen.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

/**
 * Game screen for guessing words with timer and scoring.
 */
function GameScreen({ nickname, setError }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [word, setWord] = useState(state?.wordEntry?.word || "");
  const [hint, setHint] = useState(state?.wordEntry?.hint || "");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [guess, setGuess] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [isCalculatingScore, setIsCalculatingScore] = useState(false);

  useEffect(() => {
    if (!word) {
      setError("No word available. Please select a category.");
      navigate("/");
      return;
    }
    const timer = setInterval(() => {
      if (!gameOver) {
        setTimeTaken((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [word, navigate, setError, gameOver]);

  const calculateScore = () => {
    return Math.max(
      0,
      1000 - timeTaken * 10 - incorrectGuesses * 50 - (usedHint ? 100 : 0)
    );
  };

  const handleGuess = () => {
    if (gameOver) return;
    if (guess.length === 1) {
      if (word.toLowerCase().includes(guess.toLowerCase())) {
        setGuessedLetters([...guessedLetters, guess.toLowerCase()]);
        if (
          word
            .toLowerCase()
            .split("")
            .every(
              (letter) =>
                guessedLetters.includes(letter) ||
                letter === guess.toLowerCase()
            )
        ) {
          const score = calculateScore();
          setFinalScore(score);
          setGameOver(true);
          setWon(true);
          saveScore(score);
        }
      } else {
        setIncorrectGuesses((prev) => {
          const newCount = prev + 1;
          if (newCount >= 6) {
            setGameOver(true);
            setWon(false);
          }
          return newCount;
        });
      }
    } else if (guess.toLowerCase() === word.toLowerCase()) {
      const score = calculateScore();
      setFinalScore(score);
      setGameOver(true);
      setWon(true);
      saveScore(score);
    } else {
      setIncorrectGuesses((prev) => {
        const newCount = prev + 1;
        if (newCount >= 6) {
          setGameOver(true);
          setWon(false);
        }
        return newCount;
      });
    }
    setGuess("");
  };

  const saveScore = (score) => {
    if (!nickname) {
      setError("Nickname is required to save score.");
      return;
    }
    fetch(`${API_URL}/api/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nickname: nickname.trim(),
        score: score,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Score save error:", err);
        setError(
          typeof err === "string"
            ? err
            : "Failed to save score. Please try again."
        );
      });
  };

  const displayWord = word
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
    )
    .join(" ");

  return (
    <div>
      <h1>Game Screen</h1>
      <p>Nickname: {nickname}</p>
      <p>Word: {displayWord}</p>
      <p>Incorrect Guesses: {incorrectGuesses}/6</p>
      <p>Time: {timeTaken} seconds</p>
      {usedHint && <p>Hint: {hint}</p>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleGuess}
          disabled={gameOver}
        >
          Guess
        </button>
        <button
          className="btn btn-secondary mt-2 ms-2"
          onClick={() => setUsedHint(true)}
          disabled={usedHint || gameOver}
        >
          Show Hint
        </button>
        <button
          className="btn btn-danger mt-2 ms-2"
          onClick={() => navigate("/")}
        >
          Quit
        </button>
      </div>
      {gameOver && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {won ? "Congratulations!" : "Game Over"}
                </h5>
              </div>
              <div className="modal-body">
                <p>{won ? "You won!" : "You lost."}</p>
                <p>The word was: {word}</p>
                <p>Score: {finalScore}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
