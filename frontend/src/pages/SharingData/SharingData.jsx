import { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "./SharingData.css"
import { FaPlus } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";

export default function SharingData() {
     const graphInputRef = useRef(null);

    const [showModels, setShowModels] = useState(false);
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [form, setForm] = useState({
        subject: "",
        email: "",
        graphdata: "",
        message: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(graphInputRef.current && !graphInputRef.current.contains(event.target)) {
                setShowModels(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const handleModels = (event) => {
        setShowModels(!showModels);

        fetch("/api/my", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => setModels(data))
            .catch((err) => {
                console.error(err)
                setIsError(true);
            });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log("information saved")
    }

    return (
        <div className="sharing">
            <div className="sharing-content">
                <div className="sharing-header">
                    <h1>Sharing</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-content">
                        <div className="form-group">
                            <label htmlFor="subject">Subject Title</label>
                            <input type="text" name="subject" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="password" name="email" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="graphdata">Graph Data</label>
                            <div className="graph-input" ref={graphInputRef}>
                                <input type="password" name="graphdata" onChange={onChange} />
                                <span className="form-icon" onClick={handleModels}><MdOutlineFileUpload size={20} /></span>


                                {showModels && (
                                    <div className="models-dropdown">
                                        <h2>Your Models:</h2>

                                        {isLoading && <p className="models=message">Loading models...</p>}
                                        {isError && <p className="models-message error">Error loading... Please try again.</p>}

                                        {Array.isArray(models) && models.map((model) => (
                                            <button type="button" key={model.id} className="model-option">{model.name}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Description</label>
                            <textarea name="message" onChange={onChange}></textarea>
                        </div>
                    </div>

                    <div className="form-group form-buttons">
                        <button type="submit" className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-white">Send</button>
                    </div>
                </form>
            </div>

        </div>
    )
}