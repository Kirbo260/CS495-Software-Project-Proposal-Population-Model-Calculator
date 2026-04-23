import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoChevronBack, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./ModelsPage.css";

export default function ModelsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
    fetch(`/api/models/${id}/delete`, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      })
      .then(() => {
        setModels((prev) => prev.filter((model) => model.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Delete failed: " + err.message);
      });
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
          <div className="model-card"
            key={model.id}
          >
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <p><strong>Version:</strong> {model.version}</p>

            {/* 🔥 Delete Button */}
            <button
              onClick={() => handleDelete(model.id)}
              className="dr-button"
            >
              Delete
            </button>
          </div>
        ))
      )}
       <button type="button" className="save-model-btn save-btn"><a href="/deletedModels">RESTORE MODELS PAGE</a></button>

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