import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Login failed");
                return;
            }

            // store JWT token
            localStorage.setItem("token", data.token);

            alert("Login successful");

            // redirect to dashboard/home
            navigate("/");

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-content">
                    <h1>Login to your account</h1>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={onChange}
                                required
                            />

                            <Link to="/forget-password">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-secondary">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="login-fallback">
                <Link to="/" className="login-logo">
                    <img src="logo.png" alt="Logo" />
                </Link>

                <div className="login-fallback-content">
                    <h2>First Time?</h2>
                    <Link to="/signup" className="btn btn-primary">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}