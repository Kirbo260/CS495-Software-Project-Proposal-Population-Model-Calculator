import { useState, useEffect } from "react";

export default function ModelsPage() {
  const [models, setModels] = useState([]);

  // Fetch models
  useEffect(() => {
    fetch("/api/my", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err));
  }, []);

  // DELETE FUNCTION
  const handleDelete = (id) => {
    fetch(`/api/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then(() => {
        // remove from UI instantly
        setModels(models.filter((model) => model.id !== id));
        alert("Model deleted successfully!");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Models</h1>

      {models.length === 0 ? (
        <p>No models saved yet.</p>
      ) : (
        models.map((model) => (
          <div
            key={model.id}
            style={{
              background: "linear-gradient(135deg, #ff4d4d, #ffcc00)",
              color: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              position: "relative"
            }}
          >
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <p><strong>Version:</strong> {model.version}</p>

            {/* 🔥 Delete Button */}
            <button
              onClick={() => handleDelete(model.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#990000",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}