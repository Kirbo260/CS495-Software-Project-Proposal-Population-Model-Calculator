import { IoClose, IoAdd, IoRemove, IoChevronDown, IoChevronBack } from "react-icons/io5";
import { BiCollapseHorizontal } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import graphBg from "../../assets/graph.png";
import "./ExponentialGrowthModel.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";

const GRAPH_DURATION = 10;

export default function ExponentialGrowthModel() {

    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    const [form, setForm] = useState({
        initialPopulation: "100",
        finalPopulation: "300"
    })

    const [zoomLevel, setZoomLevel] = useState(1);

    const chartSeries = useMemo(() => {
        const p0 = Number(form.initialPopulation);
        const pf = Number(form.finalPopulation);

        if (!Number.isFinite(p0) || !Number.isFinite(pf) || p0 <= 0 || pf <= 0) {
            return {
                x: [0],
                y: [0],
                isValid: false,
                maxY: 0
            }
        }

        const totalTime = GRAPH_DURATION;

        const ratePerStep = Math.pow(pf / p0, 1 / totalTime) - 1;

        const samples = 120;
        const x = Array.from(
            { length: samples + 1 },
            (_, i) => (totalTime * i) / samples
        );

        const y = x.map((t) => p0 * Math.pow(1 + ratePerStep, t));
        const maxY = Math.max(...y);

        return {
            x,
            y,
            isValid: true,
            maxY,
            ratePerStep
        }
    }, [form]);

    const basePlotRange = useMemo(() => {
        if(!chartSeries.isValid) {
            return {
                x: [0, GRAPH_DURATION],
                y: [0, 10]
            }
        }

        return {
            x: [0, GRAPH_DURATION],
            y: [0, Math.max(10, chartSeries.maxY * 1.15)]
        }
    }, [chartSeries]);


    const plotRange = useMemo(() => {
        const [xMin, xMax] = basePlotRange.x;
        const [yMin, yMax] = basePlotRange.y;

        const xCenter = (xMin + xMax) / 2;
        const yCenter = (yMin + yMax) / 2;

        const xHalf = ((xMax - xMin) * zoomLevel) / 2;
        const yHalf = ((yMax - yMin) * zoomLevel) / 2;

        return {
            x: [Math.max(0, xCenter - xHalf), xCenter + xHalf],
            y: [Math.max(0, yCenter - yHalf), yCenter  + yHalf]
        }
    }, [basePlotRange, zoomLevel]);


    const handleChange = (event) => {
        const {name, value} = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        setZoomLevel(1);
    }

    const handleZoomIn = () => {
        setZoomLevel((previous) => Math.max(0.2, previous * 0.8));
    }

    const handleZoomOut = () => {
        setZoomLevel((previous) => Math.min(8, previous * 1.25));
    }

    return (
        <div className="exponential-growth-model">
            {/* <img src={graphBg} alt="Graph Background" /> */}
            <div className="plot-wrapper">
                <Plot
                    data={[
                        {
                            x: chartSeries.x,
                            y: chartSeries.y,
                            type: "scatter",
                            mode: "lines",
                            line: {
                                width: 4,
                                color: "#111"
                            },
                            hovertemplate: 
                                "Step: %{x:.2f}<br>Population: %{y:.2f}<extra></extra>"      
                        }
                    ]}
                    layout={{
                        autosize: true,
                        paper_bgcolor: "#f4f4f4",
                        plot_bgcolor: "#f4f4f4",
                        margin: { t: 30, r: 30, b: 30, l: 30},
                        showlegend: false,
                        dragmode: false,
                        xaxis: {
                            range: plotRange.x,
                            showgrid: true,
                            gridcolor: "rgba(0,0,0,0.35)",
                            gridwidth: 1,
                            zeroline: true,
                            zerolinecolor: "#000",
                            fixedrange: true,
                            showticklabels: false,
                            ticks: "",
                            title: ""
                        },
                        yaxis: {
                            range: plotRange.y,
                            showgrid: true,
                            gridcolor: "rgb(0,0,0,0.35)",
                            gridwidth: 1,
                            zeroline: true,
                            zerolinecolor: "#000",
                            zerolinewidth: 5,
                            fixedrange: true,
                            showticklabels: false,
                            ticks: "",
                            title: ""
                        },
                    }} 
                    config= {{
                        responsive: true,
                        displayModeBar: false,
                        staticPlot: false
                    }}
                    useResizeHandler
                    style={{ width: "100%", height: "100%"}}
                    />
            </div>

            <div className="exponential-growth-model-content">
                <button className="btn btn-circle btn-close">
                    <IoClose />
                </button>

                <div className="exponential-growth-right-buttons">
                    <div className="exponential-zoom-controls">
                        <button className="btn btn-zoom" onClick={handleZoomIn}>
                            <IoAdd />
                        </button>
                        <button className="btn btn-zoom" onClick={handleZoomOut}>
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
                                <h2>Population Growth Model</h2>
                                <button className="btn-minimize" onClick={() => setIsPanelOpen(false)}><IoChevronDown size={25} /></button>
                            </div>

                            <div className="exponential-growth-panel-body">
                                <form className="exponential-growth-panel-form" onSubmit={(event) => event.preventDefault()}>
                                    <div className="form-group">
                                        <input type="text" name="initialPopulation" placeholder="Initial Population" value={form.initialPopulation} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="number" name="finalPopulation" placeholder="Final Population" value={form.finalPopulation} onChange={handleChange} />
                                    </div>
                                    {/* <div className="form-group">
                                        <input type="text" placeholder="Time" />
                                        <select name="growth-select" className="growth-select">
                                            <option value="year">Year</option>
                                            <option value="month">Month</option>
                                            <option value="day">Day</option>
                                        </select>
                                    </div> */}
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
                            <IoChevronBack size={30} />
                        </button>
                        <h2>Comparing/Adding Models</h2>
                    </div>

                    <div className="compare-panel-body">
                        <Link to="#" className="compare-model-box">
                            <span><FaPlus size={100} /></span>
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