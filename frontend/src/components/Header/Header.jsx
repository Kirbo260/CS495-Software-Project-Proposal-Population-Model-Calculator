import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <Link to="/"><img src="LOGO.png" alt="PMC logo" /></Link>
                    <nav>
                        <ul>
                            <li><Link to="#">Help</Link></li>
                            <li><Link to="#">About us</Link></li>
                            <li><Link to="#">My models</Link></li>
                            <li><Link to="#">Help</Link></li>
                        </ul>
                    </nav>
                    <div className="header-buttons">
                        <Link to="#">Login</Link>
                        <Link to="#" className="btn-primary">Sign-up</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header