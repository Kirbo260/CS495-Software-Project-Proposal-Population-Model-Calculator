import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CiUser } from "react-icons/ci";
import { useEffect, useState, useRef } from "react";
import "./Header.css"

const Header = () => {
    const navigate = useNavigate();
    const dropdownref = useRef(null);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    // check if user is logged in
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropdownref.current && !dropdownref.current.contains(event.target)) {
                setIsDropDownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

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
                            <li><Link to="/about-us">About us</Link></li>
                            <li> {isLoggedIn ? <Link to="/models">My models</Link>
                             : <Link to="/login">My models</Link>}</li>
                        </ul>
                    </nav>

                    {isLoggedIn ? (
                        // <div className="header-buttons">
                        //     <button onClick={handleLogout} className="btn-secondary">
                        //         Logout
                        //     </button>
                        // </div>
                        <div className="user-menu" ref={dropdownref}>
                            <div className="user-trigger" onClick={() => setIsDropDownOpen((prev) => !prev)}>
                                <span className="user-icon"><CiUser size={20}/></span>
                                <span>Student</span>
                            </div>

                            {isDropDownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/studentsettings" className="dropdown-item">
                                        Settings
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                </div>
                            )}
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