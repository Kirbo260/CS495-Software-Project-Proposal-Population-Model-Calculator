import { useParams } from "react-router-dom";
import { useState } from "react";
//import "./ForgetPassword.css"

export default function ResetPassword() {
    const { token } = useParams();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`/api/reset/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword: form.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setMessage(data.message || "Password reset successful");

        } catch (err) {
            setError("Server error. Try again.");
            console.err("Server error. Try again.", err);
        }
    };

    return (
        <div className="forget-password_reset">
            <form onSubmit={onSubmit}>
                <div className="reset-password">
                    <h1>Reset Password</h1>
                    <input
                        type="password"
                        placeholder="New password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) =>
                            setForm({ ...form, confirmPassword: e.target.value })
                        }
                    />

                    <button className="btn btn-secondary">Reset Password</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
            </form>
        </div>
    );
}