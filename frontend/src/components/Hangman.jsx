import React from "react";

function Hangman({ incorrectGuesses }) {
  return (
    <div className="hangman-container">
      <svg viewBox="0 0 300 300" className="hangman-svg">
        {/* Base */}
        <line
          x1="50"
          y1="250"
          x2="250"
          y2="250"
          stroke="black"
          strokeWidth="4"
        />
        <line
          x1="100"
          y1="250"
          x2="100"
          y2="50"
          stroke="black"
          strokeWidth="4"
        />
        <line
          x1="100"
          y1="50"
          x2="200"
          y2="50"
          stroke="black"
          strokeWidth="4"
        />
        <line
          x1="200"
          y1="50"
          x2="200"
          y2="80"
          stroke="black"
          strokeWidth="4"
        />

        {/* Head */}
        {incorrectGuesses >= 1 && (
          <circle
            cx="200"
            cy="100"
            r="20"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
        )}

        {/* Body */}
        {incorrectGuesses >= 2 && (
          <line
            x1="200"
            y1="120"
            x2="200"
            y2="180"
            stroke="black"
            strokeWidth="4"
          />
        )}

        {/* Left Arm */}
        {incorrectGuesses >= 3 && (
          <line
            x1="200"
            y1="140"
            x2="160"
            y2="160"
            stroke="black"
            strokeWidth="4"
          />
        )}

        {/* Right Arm */}
        {incorrectGuesses >= 4 && (
          <line
            x1="200"
            y1="140"
            x2="240"
            y2="160"
            stroke="black"
            strokeWidth="4"
          />
        )}

        {/* Left Leg */}
        {incorrectGuesses >= 5 && (
          <line
            x1="200"
            y1="180"
            x2="160"
            y2="220"
            stroke="black"
            strokeWidth="4"
          />
        )}

        {/* Right Leg */}
        {incorrectGuesses >= 6 && (
          <line
            x1="200"
            y1="180"
            x2="240"
            y2="220"
            stroke="black"
            strokeWidth="4"
          />
        )}
      </svg>
    </div>
  );
}

export default Hangman;
