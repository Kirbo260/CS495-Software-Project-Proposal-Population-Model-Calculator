import { Link } from "react-router-dom";
import { useState } from "react";
import "./ForgetPassword.css"
import SecondaryHeader from "../../components/Header/SecondaryHeader";

export default function ForgetPassword() {
    const [form, setForm] = useState({
        email: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    //const [loading, setLoading] = useState(""); // to prevent spam clicks

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email.trim()) {
        setError("Email is required.");
        return;
    }

    try {
        const res = await fetch("/api/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: form.email }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
            return;
        }

        setSuccess("Reset link sent to email");
    } catch (err) {
        setError("Something went wrong");
        console.err("Server error. Try again.",err);
    }
};

    return (
        <div className="forget-password">
            <SecondaryHeader />
            <div className="forget-password-form">
                <div className="forget-password-form-content">
                    <h1>Forget Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Verify Email</label>
                            <input type="email" name="email" value={form.email} onChange={onChange} />
                           {/* <Link to="#">Send request code</Link> */}
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