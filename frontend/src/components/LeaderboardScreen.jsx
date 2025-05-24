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
    <div className="container">
      <h1 className="text-center mb-4">Leaderboard</h1>
      {scores.length === 0 ? (
        <div className="text-center">
          <p className="lead">No scores available yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center">
                  Rank
                </th>
                <th scope="col">Player</th>
                <th scope="col" className="text-end">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{score.playerName}</td>
                  <td className="text-end">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LeaderboardScreen;
