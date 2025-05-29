import React from 'react';

// About Page Component
function AboutPage() {
  return (
    <div className="container fade-in">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">
                <i className="fas fa-info-circle me-2"></i>
                About Word Guessing Game
              </h1>

              <div className="mb-4">
                <h2 className="h4 mb-3">Game Overview</h2>
                <p>
                  Word Guessing Game is a modern take on the classic Hangman game, combining elements of Wordle
                  with the ability to create and manage custom word sets. Players can test their vocabulary
                  across various categories while competing for high scores on the leaderboard.
                </p>
              </div>

              <div className="mb-4">
                <h2 className="h4 mb-3">Game Features</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fas fa-gamepad me-2"></i>
                    Multiple word categories including Animals, Fruits, and Football Players
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-clock me-2"></i>
                    Real-time timer to track your solving speed
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-lightbulb me-2"></i>
                    Hint system to help when you're stuck
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-trophy me-2"></i>
                    Global leaderboard to compete with other players
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-edit me-2"></i>
                    Word management system to add your own categories and words
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="h4 mb-3">How to Play</h2>
                <ol className="list-group list-group-flush list-group-numbered">
                  <li className="list-group-item">Enter your nickname on the landing page</li>
                  <li className="list-group-item">Select a word category</li>
                  <li className="list-group-item">Guess letters or the entire word</li>
                  <li className="list-group-item">Use hints if needed (affects final score)</li>
                  <li className="list-group-item">Try to guess the word before running out of attempts</li>
                </ol>
              </div>

              <div className="mb-4">
                <h2 className="h4 mb-3">Scoring System</h2>
                <p>
                  Your score is calculated using the following formula:
                </p>
                <div className="alert alert-info">
                  <strong>Final Score = 1000 - (Time Taken × 10) - (Incorrect Guesses × 50) - (Hint Used × 100)</strong>
                  <ul className="mb-0 mt-2">
                    <li>Base score: 1000 points</li>
                    <li>Time penalty: -10 points per second</li>
                    <li>Incorrect guess penalty: -50 points per wrong guess</li>
                    <li>Hint penalty: -100 points if hint is used</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="h4 mb-3">Technical Details</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Frontend:</strong> React with Bootstrap for responsive design
                  </li>
                  <li className="list-group-item">
                    <strong>Backend:</strong> Spring Boot REST API
                  </li>
                  <li className="list-group-item">
                    <strong>Data Storage:</strong> Java ObjectStreams for word bank and scores
                  </li>
                  <li className="list-group-item">
                    <strong>Word Requirements:</strong> Letters a-z only, case insensitive
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="h4 mb-3">Error Handling</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                    Server unavailable before game start → Game start blocked
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                    Server unavailable after game end → Score cannot be saved
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                    No words available → Game start blocked
                  </li>
                </ul>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted">
                  <i className="fas fa-code me-2"></i>
                  Built with React and Spring Boot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
