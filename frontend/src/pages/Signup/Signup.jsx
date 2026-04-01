import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import SecondaryHeader from "../../components/Header/SecondaryHeader";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Firstname</label>
                        <input type="text" name="firstName" value={form.firstName} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Lastname</label>
                        <input type="text" name="lastName" value={form.lastName} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" value={form.age} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={form.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={form.password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary">Verify</button>
                    </div>
                </form>
            </div>
        </div>
    )
}