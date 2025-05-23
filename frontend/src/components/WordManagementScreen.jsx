// Word Management Screen Component
import { useState, useEffect } from "react";

function WordManagementScreen({ setError }) {
  const [words, setWords] = useState([]);
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    fetch("/api/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch(() => setError("Failed to fetch words."));
  }, []);

  const handleAdd = () => {
    if (!category.match(/^[a-zA-Z]+$/) || !word.match(/^[a-zA-Z]+$/)) {
      setError("Category and word must contain only letters a-z.");
      return;
    }
    fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, word, hint }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to add word")
      )
      .then((data) => {
        setWords([...words, data]);
        setCategory("");
        setWord("");
        setHint("");
      })
      .catch((err) => setError(err));
  };

  const handleDelete = (category, word) => {
    fetch(`/api/words?category=${category}&word=${word}`, {
      method: "DELETE",
    })
      .then((res) =>
        res.ok
          ? setWords(
              words.filter((w) => w.category !== category || w.word !== word)
            )
          : Promise.reject("Failed to delete word")
      )
      .catch((err) => setError(err));
  };

  return (
    <div>
      <h1>Word Management</h1>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="form-label">Word</label>
        <input
          type="text"
          className="form-control"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <label className="form-label">Hint</label>
        <input
          type="text"
          className="form-control"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAdd}>
          Add Word
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Word</th>
            <th>Hint</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.map((w, index) => (
            <tr key={index}>
              <td>{w.category}</td>
              <td>{w.word}</td>
              <td>{w.hint}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(w.category, w.word)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordManagementScreen;
