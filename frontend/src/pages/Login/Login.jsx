import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-content">
                    <h1>Login to your account</h1>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" />
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-secondary">Sign-in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login-fallback">
                <Link to="/" className="login-logo"><img src="LOGO.png" alt="Logo" /></Link>
                <div className="login-fallback-content">
                    <h2>First Time?</h2>
                    <Link to="#" className="btn btn-primary">Sign-up</Link>
                </div>
            </div>
        </div>
    )
}