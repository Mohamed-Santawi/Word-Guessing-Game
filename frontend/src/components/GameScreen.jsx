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
    <div className="container fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">Word Guessing Game</h1>
              <div className="player-info mb-4">
                <p className="lead text-center">
                  Player: <span className="fw-bold">{nickname}</span>
                </p>
              </div>

              <div className="game-stats d-flex justify-content-between mb-4">
                <div className="timer">
                  <i className="fas fa-clock me-2"></i>
                  {timeTaken}s
                </div>
                <div className="attempts">
                  <i className="fas fa-heart me-2"></i>
                  {6 - incorrectGuesses}/6
                </div>
              </div>

              <div className="word-display mb-4">{displayWord}</div>

              {usedHint && (
                <div className="hint-box mb-4">
                  <i className="fas fa-lightbulb me-2"></i>
                  <strong>Hint:</strong> {hint}
                </div>
              )}

              <div className="progress-indicator mb-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className={`progress-dot ${
                      index < incorrectGuesses ? "active" : ""
                    }`}
                  />
                ))}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg mb-3"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  disabled={gameOver}
                  placeholder="Enter your guess..."
                  maxLength={word.length}
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleGuess}
                    disabled={gameOver}
                  >
                    <i className="fas fa-check me-2"></i>
                    Guess
                  </button>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => setUsedHint(true)}
                    disabled={usedHint || gameOver}
                  >
                    <i className="fas fa-lightbulb me-2"></i>
                    Hint
                  </button>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-times me-2"></i>
                    Quit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {won ? (
                    <span className="text-success">
                      <i className="fas fa-trophy me-2"></i>
                      Congratulations!
                    </span>
                  ) : (
                    <span className="text-danger">
                      <i className="fas fa-times-circle me-2"></i>
                      Game Over
                    </span>
                  )}
                </h5>
              </div>
              <div className="modal-body text-center">
                <p className="lead">{won ? "You won!" : "You lost."}</p>
                <p>
                  The word was: <strong>{word}</strong>
                </p>
                <div className="score-display">Score: {finalScore}</div>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-home me-2"></i>
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
