import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import SecondaryHeader from "../../components/Header/SecondaryHeader";
import { MdOutlineFileUpload } from "react-icons/md";
import "./Signup.css";

export default function InstructorSignup() {
    const navigate = useNavigate();

    const fileRef = useRef(null);

    const [form, setForm] = useState({
        email: "",
        professorId: "",
        certificateFile: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const onFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        setForm((p) => ({ ...p, certificateFile: file }))

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
                    <h1>Sign-up (Instructor)</h1>
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
                        <label htmlFor="text">Professor-ID</label>
                        <input type="text" name="professorId" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Degree Certificate</label>
                        <div className="degree-certifcate" onClick={() => fileRef.current?.click()}>
                            <MdOutlineFileUpload size={22} />
                            <input ref={fileRef} type="file" onChange={onFileChange} accept=".pdf,.png,.jpg,.jpeg" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}