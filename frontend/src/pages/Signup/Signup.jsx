import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import SecondaryHeader from "../../components/Header/SecondaryHeader";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="signup">
            <SecondaryHeader />
            <div className="signup-content">
                <div className="signup-header">
                    <h1>Sign-up</h1>
                    <button onClick={() => navigate(-1)}>
                        <IoMdClose />
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={form.name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={form.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={form.password} onChange={onChange} />
                    </div>
                    <div className="form-group radio-buttons">
                        <label htmlFor="student" className={`su-pill ${form.role == "student" ? "isActive" : ""}`}>
                            <input type="radio" name="role" value="student" checked={form.role === "student"} onChange={onChange} />
                            <span className="form-pilldot">Student</span>
                        </label>

                        <label htmlFor="instructor" className={`su-pill ${form.role == "instructor" ? "isActive" : ""}`}>
                            <input type="radio" name="role" value="instructor" checked={form.role === "instructor"} onChange={onChange} />
                            <span className="form-pilldot">Instructor</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary">Verify</button>
                    </div>
                </form>
            </div>
        </div>
    )
}