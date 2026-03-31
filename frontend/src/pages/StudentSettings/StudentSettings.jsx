import { useState } from "react";
import { FiUser } from "react-icons/fi";
import "./StudentSettings.css"

export default function StudentSettings() {

    const [form, setForm] = useState({
        username: "",
        newPassword: "",
        currentPassword: "",
        bioinfo: "student"
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log("information saved")
    }

    return (
        <div className="student-settings">
            <div className="student-settings-content">
                <div className="student-settings-header">
                    <h1>Settings</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-content">
                        <div className="form-group">
                            <div className="user-icon">
                                <FiUser size={60}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={onChange} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" name="newPassword" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input type="password" name="currentPassword" onChange={onChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bioinfo">Bio-info</label>
                            <textarea name="bioinfo" onChange={onChange}></textarea>
                        </div>
                    </div>

                    <div className="form-group form-buttons">
                        <button type="submit" className="btn btn-black">Switch account</button>
                        <button type="submit" className="btn btn-secondary">Delete account</button>
                        <button type="submit" className="btn btn-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}