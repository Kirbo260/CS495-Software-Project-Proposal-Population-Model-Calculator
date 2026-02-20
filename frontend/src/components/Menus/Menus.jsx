import "./Menus.css"

export default function Menus() {
    return (
        <div className="menu-grid">
            <div className="menu-grid-boxes">
                <div className="menu-box">
                    <h3>Upload Models</h3>
                    <a href="#" className="btn btn-primary">Import</a>
                </div>
                <div className="menu-box">
                    <h3>Design Models</h3>
                    <a href="#" className="btn btn-primary">Create</a>
                </div>
                <div className="menu-box">
                    <h3>Assignments</h3>
                    <a href="#" className="btn btn-primary">View</a>
                </div>
                <div className="menu-box">
                    <h3>Quick Calc</h3>
                    <a href="#" className="btn btn-primary">Calculate</a>
                </div>
            </div>
        </div>
    )
}