import {useState} from "react";

export default function ModalInputs({ isOpen, onClose, onSubmit }) {
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState("");

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
        name: modelName,
        description,
        version
    };

    console.log({
      modelName,
      description,
      version
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

                <button onClick={handleClose}>X</button>

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
                 <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}