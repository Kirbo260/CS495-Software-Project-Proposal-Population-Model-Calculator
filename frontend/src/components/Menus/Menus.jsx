import { Link, useNavigate } from "react-router-dom"
import "./Menus.css"
import { useState } from "react"
import NoAccess from "../NoAccess/NoAccess";

export default function Menus() {
    const navigate = useNavigate();
    const [showAccessModal, setShowAccessModal] = useState(false);

    const handleProtectedClick = (path) => {
        const token = localStorage.getItem("token");

        if(!token) {
            setShowAccessModal(true);
            return;
        }

        navigate(path);
    }

    const closeModal = () => {
        setShowAccessModal(false);
    }


    return (
        <div className="menu-grid">
            <div className="menu-grid-boxes">
                <div className="menu-box">
                    <h3>Upload Models</h3>
                    <button type="button" className="btn btn-primary" onClick={() => handleProtectedClick("#")}>Import</button>
                </div>
                <div className="menu-box">
                    <h3>Design Models</h3>
                    <button className="btn btn-primary" onClick={() => handleProtectedClick("/design-models")}>Create</button>
                </div>
                <div className="menu-box">
                    <h3>Sharing Data</h3>
                    <button to="#" className="btn btn-primary" onClick={() => handleProtectedClick("#")}>View</button>
                </div>
                <div className="menu-box">
                    <h3>Quick Calc</h3>
                    <button className="btn btn-primary" onClick={() => Navigate("/modelselection")}>Calculate</button>
                </div>
            </div>

            {showAccessModal && <NoAccess setShowAccessModal={setShowAccessModal}/>}
        </div>
    )
}