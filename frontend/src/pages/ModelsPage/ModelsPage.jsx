import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoChevronBack, IoClose } from "react-icons/io5";
import "./ModelsPage.css";

export default function ModelsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="models-page">
      <div className="design-models-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <IoChevronBack size={45} />
          <span>Back</span>
        </button>
        <h1>My Models/Sharing Models</h1>
        <span></span>
      </div>

      {models.length === 0 || !Array.isArray(models) ? (
        <div className="design-models-main">
          <div className="container">
            <button className="add-model" onClick={() => setIsModalOpen(true)}>
              <FaPlus size={250} color="#fff" />
            </button>
            <p>Get started and create your own model</p>
          </div>
        </div>
      ) : (
        Array.isArray(models) && models.map((model) => (
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

      {isModalOpen && (
        <div className="save-modal-overlay">
          <div className="save-model-modal">
            <div className="save-model-header">
              <button type="button" className="save-model-close" onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </button>
              <h2>Pick the given options</h2>
            </div>

            <div className="save-model-body">
              <p>In order to see your models and or share them you must create atleast one of them with the given two options</p>

              <div className="model-modal-actions">
                <button type="button" className="save-model-btn save-btn">
                  Quick Calculations
                </button>
                <button type="button" className="save-model-btn save-btn">
                  Design Models
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}