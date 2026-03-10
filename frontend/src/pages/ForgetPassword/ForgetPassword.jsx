import { Link } from "react-router-dom";
import { useState } from "react";
import "./ForgetPassword.css"
import SecondaryHeader from "../../components/Header/SecondaryHeader";

export default function ForgetPassword() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if(!form.email.trim()) {
            setError("Email is required.");
            return;
        }

        if(!form.password.trim()) {
            setError("New password is required.");
            return;
        }

        if(form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        console.log("Login submit")
        setSuccess("Passsword reset submitted successfully")
    }

    return (
        <div className="forget-password">
            <SecondaryHeader />
            <div className="forget-password-form">
                <div className="forget-password-form-content">
                    <h1>Forget Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Verify Email</label>
                            <input type="text" name="email" onChange={onChange} />
                            <Link to="#">Send request code</Link>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={onChange}/>
                        </div>

                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}

                        <div className="form-group">
                            <button type="submit" className="btn btn-secondary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}