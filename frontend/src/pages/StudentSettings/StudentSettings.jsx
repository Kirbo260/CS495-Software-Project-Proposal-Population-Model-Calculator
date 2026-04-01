import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "./StudentSettings.css"
import { FaPlus } from "react-icons/fa6";

export default function StudentSettings() {

    const [showAccountModal, setShowAccountModal] = useState(false);

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
                                <FiUser size={60} />
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
                        <button type="submit" className="btn btn-black" onClick={() => setShowAccountModal(true)}>Switch account</button>
                        <button type="submit" className="btn btn-secondary">Delete account</button>
                        <button type="submit" className="btn btn-white">Save</button>
                    </div>
                </form>
            </div>


            {showAccountModal && (
                <div className="account-modal-overlay" onClick={() => setShowAccountModal(false)}>
                    <div className="account-modal-wrapper">
                        <div className="account-model-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="account-modal-header">
                                <IoClose onClick={() => setShowAccountModal(false)} color="#000" size={20} />
                                <h2>Accounts</h2>
                                <span></span>
                            </div>
                            <div className="account-modal-content">
                                <div className="account-modal-content-main">
                                    <button className="add-model" onClick={() => setIsModalOpen(true)}>
                                        <FaPlus size={250} color="#C47384" />
                                    </button>
                                    <p>Create a new account in-order to switch accounts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}