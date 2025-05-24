// Leaderboard Screen Component
import { useState, useEffect } from "react";
import { API_URL } from "../config";

function LeaderboardScreen() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/scores`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        return res.json();
      })
      .then((data) => setScores(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      {scores.length === 0 ? (
        <p>No scores available yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.playerName}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaderboardScreen;
