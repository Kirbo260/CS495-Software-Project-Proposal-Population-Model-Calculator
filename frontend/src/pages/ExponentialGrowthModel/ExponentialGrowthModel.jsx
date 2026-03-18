import { IoClose, IoAdd, IoRemove, IoChevronDown } from "react-icons/io5";
import { BiCollapseHorizontal } from "react-icons/bi";
import graphBg from "../../assets/graph.png";
import "./ExponentialGrowthModel.css";
import { useState } from "react";

export default function ExponentialGrowthModel() {

    const [isPanelOpen, setIsPanelOpen] = useState(true);

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

                    <button className="btn btn-circle btn-collapse">
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

            </div>
        </div>
    )
}