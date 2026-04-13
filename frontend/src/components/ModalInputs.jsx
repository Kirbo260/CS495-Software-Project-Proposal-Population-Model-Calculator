import {useState} from "react";
import "../cssPages/Modalcss.css";

export default function ModalInputs({ isOpen, onClose, onSubmit }) {
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState("");
    const [type, setType] = useState("");

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
        name: modelName,
        description,
        version,
        type

    };

    console.log({
      modelName,
      description,
      version,
      type
    });

    onSubmit(data);
    console.log("SUBMIT CLICKED", data);
    onClose();
    //alert("Model saved successfully!");
  };

    if (!isOpen) return null; // don't render if closed

    return (
        <div className="modal">
            <div className="modal-content">

                <span className="close" onClick={handleClose}>&times;</span>

                <h2>Save Model</h2>
                <input
                    type="text"
                    placeholder="Model Name"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Version"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                />
                <select
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Select Type</option>
                    <option value="logistic">Logistic</option>
                    <option value="continuous">Continuous</option>
                    <option value="discrete">Discrete</option>
                    <option value="predator_prey">Predator-Prey</option>
                    <option value="EmComparison">EmComparison</option>
                </select>
        
                 <button className="theButton" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}