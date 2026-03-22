import { IoClose, IoAdd, IoRemove, IoChevronDown, IoChevronBack } from "react-icons/io5";
import { BiCollapseHorizontal } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import graphBg from "../../assets/graph.png";
import "./ExponentialGrowthModel.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ExponentialGrowthModel() {

    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isCompareOpen, setIsCompareOpen] = useState(true);

    return (
        <div className="exponential-growth-model">
            <img src={graphBg} alt="Graph Background" />

            <div className="exponential-growth-model-content">
                <button className="btn btn-circle btn-close">
                    <IoClose />
                </button>

                <div className="exponential-growth-right-buttons">
                    <div className="exponential-zoom-controls">
                        <button className="btn btn-zoom">
                            <IoAdd />
                        </button>
                        <button className="btn btn-zoom">
                            <IoRemove />
                        </button>
                    </div>

                    <button className="btn btn-circle btn-collapse" onClick={() => setIsCompareOpen(true)}>
                        <BiCollapseHorizontal />
                    </button>
                </div>

                {
                    isPanelOpen ? (
                        <div className="exponential-growth-panel">
                            <div className="exponential-growth-panel-header">
                                <span>
                                    {/* <IoRemove size={25}/> */}
                                </span>
                                <h2>Exponential Growth Model</h2>
                                <button className="btn-minimize" onClick={() => setIsPanelOpen(false)}><IoChevronDown size={25} /></button>
                            </div>

                            <div className="exponential-growth-panel-body">
                                <form className="exponential-growth-panel-form">
                                    <div className="form-group">
                                        <input type="text" placeholder="Initial Population" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Growth Rate" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Time" />
                                        <select name="growth-select" className="growth-select">
                                            <option value="year">Year</option>
                                            <option value="month">Month</option>
                                            <option value="day">Day</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                        </div>
                    ) : (
                        <button className="btn btn-reopen" onClick={() => setIsPanelOpen(true)}>
                            <IoAdd />
                        </button>
                    )
                }

                <div className={`compare-side-panel ${isCompareOpen ? "open" : ""}`}>
                    <div className="compare-panel-header">
                        <button onClick={() => setIsCompareOpen(false)} className="compare-back-btn">
                            <IoChevronBack size={30}/>
                        </button>
                        <h2>Comparing/Adding Models</h2>
                    </div>

                    <div className="compare-panel-body">
                        <Link to="#" className="compare-model-box">
                            <span><FaPlus size={100}/></span>
                            <p>Create a new model</p>
                        </Link>

                        {/* <Link to="#" className="compare-model-box compare-model-box-graph">
                            <span></span>
                            <p>Graph test 1 (exponential)</p>
                        </Link>

                        <Link to="#" className="compare-model-box">
                            <span></span>
                            <p>Graph test 2 (Logistic)</p>
                        </Link> */}
                    </div>

                </div>

            </div>
        </div>
    )
}