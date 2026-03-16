import { Link } from "react-router-dom"
import "./Menus.css"

export default function Menus() {
    return (
        <div className="menu-grid">
            <div className="menu-grid-boxes">
                <div className="menu-box">
                    <h3>Upload Models</h3>
                    <Link to="#" className="btn btn-primary">Import</Link>
                </div>
                <div className="menu-box">
                    <h3>Design Models</h3>
                    <Link to="/design-models" className="btn btn-primary">Create</Link>
                </div>
                <div className="menu-box">
                    <h3>Assignments</h3>
                    <Link to="#" className="btn btn-primary">View</Link>
                </div>
                <div className="menu-box">
                    <h3>Quick Calc</h3>
                    <Link to="/modelselection" className="btn btn-primary">Calculate</Link>
                </div>
            </div>
        </div>
    )
}