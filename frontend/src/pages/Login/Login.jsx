import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css"

export default function Login() {
    const [form, setForm] = useState({
            username: "",
            password: "",
        });
    
        const onChange = (event) => {
            const { name, value } = event.target;
            setForm((p) => ({ ...p, [name]: value }));
        }
    
        const onSubmit = (event) => {
            event.preventDefault();
            console.log("Login submit")
        }

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-content">
                    <h1>Login to your account</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={onChange} placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" onChange={onChange} />
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-secondary">Sign-in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login-fallback">
                <Link to="/" className="login-logo"><img src="logo.png" alt="Logo" /></Link>
                <div className="login-fallback-content">
                    <h2>First Time?</h2>
                    <Link to="/signup" className="btn btn-primary">Sign-up</Link>
                </div>
            </div>
        </div>
    )
}