import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import "./ModelsPage.css";

export default function DeletedModelsPage() {
    const [deletedModels, setDeletedModels] = useState([]);
    const [loading, setLoading] = useState(true);// prevents button spamming
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeletedModels = async () => {
            try {
                const res = await fetch(`/api/deleted`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch deleted models");
                }

                // Ensure it's always an array
                setDeletedModels(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching deleted models:", err);
                setDeletedModels([]); // fallback
            } finally {
                setLoading(false);
            }
        };

        fetchDeletedModels();
    }, []);

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
        <div className="models-page">
            <div className="design-models-header">
                <button className="back-btn" onClick={() => navigate("/models")}>
                    <IoChevronBack size={35} />
                    Back
                </button>
                <h1>Recycle Bin</h1>
                 <div></div>
            </div>

            {/* Loading state */}
            {loading ? (
                <p>Loading...</p>
            ) : deletedModels.length === 0 ? (
                <div className="empty-bin">
                    <p>No deleted models found</p>
                </div>
            )
                :
                (
                    <div className="deleted-list">
                        {/* If there are deleted models */}
                        {Array.isArray(deletedModels) &&
                            deletedModels.map((model) => (
                                <div key={model.id} className="model-card">
                                    <div className="card-info">
                                        <h3>{model.name}</h3>
                                        <p>{model.description}</p>
                                        <span>Version: {model.version}</span>
                                    </div>

                                    <button
                                        className="dr-button"
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