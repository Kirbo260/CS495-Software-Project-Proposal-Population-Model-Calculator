import { IoChevronBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import "./DesignModels.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DesignModels() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modelOptions = [
        {
            label: "Continuous Growth",
            link: "#"
        },
        {
            label: "Logistic Growth",
            link: "#"
        },
        {
            label: "Population Growth Rate",
            link: "/design-models/exponential-growth-model"
        },
        {
            label: "Discrete Growth",
            link: "#"
        },
    ]

    return (
        <>
            <div className="design-models">
                <div className="design-models-header">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        <IoChevronBack size={45} />
                        <span>Back</span>
                    </button>
                    <h1>Comparing/Adding models</h1>
                    <span></span>
                </div>
                <div className="design-models-main">
                    <div className="container">
                        <button className="add-model" onClick={() => navigate("/design-models/exponential-growth-model")}>
                            <FaPlus size={250} color="#C47384" />
                        </button>
                        <p>Get started and create your own model</p>
                    </div>
                </div>

                <div className="design-models-footer">
                    <Link to="/modelselection" className="btn">Quick Calc</Link>
                </div>
            </div>

            {/* {isModalOpen && (
                <div className="design-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="design-modal-wrapper">
                        <div className="design-model-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="design-modal-header">
                                <IoClose onClick={() => setIsModalOpen(false)} />
                                <h2>Switch Graph Models</h2>
                                <span></span>
                            </div>
                            <div className="design-modal-content">
                                {modelOptions.map((modelOption, index) => (
                                    <Link to={modelOption.link} key={index} className="btn btn-label">
                                        {modelOption.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}