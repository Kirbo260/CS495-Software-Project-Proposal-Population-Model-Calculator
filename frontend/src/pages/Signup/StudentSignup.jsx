import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import SecondaryHeader from "../../components/Header/SecondaryHeader";
import "./Signup.css";

export default function StudentSignup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        studentId: "",
        graduationYear: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Student signup", form)
    }

    return (
        <div className="signup student-signup">
            <SecondaryHeader />
            <div className="signup-content">
                <div className="signup-header">
                    <h1>Sign-up (Student)</h1>
                    <button onClick={() => navigate(-1)}>
                        <GoArrowRight />
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Verify Email</label>
                        <input type="email" name="email" onChange={onChange} />
                        <Link to="#" className="request-code">Send request code</Link>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Student-ID</label>
                        <input type="text" name="studentId" onChange={onChange} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="text">Year of graduation</label>
                        <input type="date" name="graduationYear" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}