import { Link } from "react-router-dom";
import "./Header.css"

const SecondaryHeader = () => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <Link to="/"><img src="LOGO.png" alt="PMC logo" /></Link>
                    <div></div>
                </div>
            </div>
        </header>
    )
}

export default SecondaryHeader;