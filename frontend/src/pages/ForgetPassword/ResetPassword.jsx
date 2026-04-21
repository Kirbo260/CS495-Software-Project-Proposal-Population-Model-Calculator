import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ForgetPassword.css"

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
            console.err("Server error. Try again.",err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
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

            <button>Reset Password</button>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </form>
    );
}