import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css"

const Header = () => {
    const navigate = useNavigate();

    // check if user is logged in
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token"); // remove JWT
        navigate("/login"); // redirect to login page
    };

    return (
        <header>
            <div className="container">
                <div className="header">
                    <Link to="/"><img src={logo} alt="PMC logo" /></Link>
                    <nav>
                        <ul>
                            <li><Link to="/help">Help</Link></li>
                            <li><Link to="#">About us</Link></li>
                            <li><Link to="#">My models</Link></li>
                        </ul>
                    </nav>
                    {isLoggedIn ? (
                        <div className="header-buttons">
                            <button onClick={handleLogout} className="btn-secondary">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="header-buttons">
                            <Link to="/login">Login</Link>
                            <Link to="/signup" className="btn-primary">Sign-up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header