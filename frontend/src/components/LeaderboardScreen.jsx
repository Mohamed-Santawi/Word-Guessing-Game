// Leaderboard Screen Component
import { useState, useEffect } from "react";

function LeaderboardScreen() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch("/api/scores")
      .then((res) => res.json())
      .then((data) => setScores(data))
      .catch(() => alert("Failed to fetch leaderboard."));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.nickname}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default LeaderboardScreen;
