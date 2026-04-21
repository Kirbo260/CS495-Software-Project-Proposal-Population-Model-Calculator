import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./DeletedModelsPage.css";
import { IoChevronBack } from "react-icons/io5";

export default function DeletedModelsPage() {
  const [deletedModels, setDeletedModels] = useState([]);
  const navigate = useNavigate();

  // Fetch deleted models
  useEffect(() => {
    const fetchDeleted = async () => {
      try {
        const res = await fetch("/api/deleted", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
        setDeletedModels(data);
      } catch (err) {
        console.error("Error fetching deleted models:", err);
      }
    };

    fetchDeleted();
  }, []);

  // Restore model
  const handleRestore = async (id) => {
    try {
      const res = await fetch(`/api/models/restore/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // remove from UI instantly
      setDeletedModels((prev) =>
        prev.filter((model) => model.id !== id)
      );

      alert("Model restored successfully!");
    } catch (err) {
      console.error(err);
      alert("Restore failed: " + err.message);
    }
  };

  return (
    <div className="deleted-page">

      {/* HEADER */}
      <div className="deleted-header">
        <button className="back-btn" onClick={() => navigate("/models")}>
          <IoChevronBack size={35} />
          Back
        </button>

        <h1>Recycle Bin</h1>
      </div>

      {/* EMPTY STATE */}
      {deletedModels.length === 0 ? (
        <div className="empty-bin">
          <p>No deleted models found</p>
        </div>
      ) : (
        <div className="deleted-list">
          {deletedModels.map((model) => (
            <div key={model.id} className="deleted-card">

              <div className="deleted-info">
                <h3>{model.name}</h3>
                <p>{model.description}</p>
                <span>Version: {model.version}</span>
              </div>

              <button
                className="restore-btn"
                onClick={() => handleRestore(model.id)}
              >
                Restore
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}