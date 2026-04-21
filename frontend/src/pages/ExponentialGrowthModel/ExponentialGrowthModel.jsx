import { IoClose, IoAdd, IoRemove, IoChevronDown, IoChevronBack } from "react-icons/io5";
import { BiCollapseHorizontal } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import graphBg from "../../assets/graph.png";
import "./ExponentialGrowthModel.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";

const GRAPH_DURATION = 10;

export default function ExponentialGrowthModel() {

    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isSaveModal, setIsSaveModal] = useState(false);
    const [isCurveModal, setIsCurveModal] = useState(false);
    const [isExponentialModal, setIsExponetialModal] = useState(false);
    const [isContinuousModal, setIsContinuousModal] = useState(false);

    const curveModalRef = useRef(null);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        initialPopulation: "100",
        finalPopulation: "300"
    })

    const [form2, setForm2] = useState({
        initialPopulation: "200",
        finalPopulation: "500"
    })

    const [continuousModalForm, setContinuousModalForm] = useState({

    })

    const [zoomLevel, setZoomLevel] = useState(1);
    const [xPan, setXPan] = useState(50);
    const [yPan, setYPan] = useState(50);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("triggered")
            if (curveModalRef.current && !curveModalRef.current.contains(event.target)) {
                console.log("triggered inside")

                setIsCurveModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const buildChartSeries = (values) => {
        const p0 = Number(values.initialPopulation);
        const pf = Number(values.finalPopulation);

        if (!Number.isFinite(p0) || !Number.isFinite(pf) || p0 === 0 || pf === 0) {
            return {
                x: [0],
                y: [0],
                isValid: false,
                maxY: 10,
                minY: -10
            };
        }

        const sameSign = (p0 > 0 && pf > 0) || (p0 < 0 && pf < 0);
        if (!sameSign) {
            return {
                x: [0],
                y: [0],
                isValid: false,
                maxY: 10,
                minY: -10
            };
        }

        const totalTime = GRAPH_DURATION;
        const samples = 300;

        const sign = Math.sign(p0);
        const startAbs = Math.abs(p0);
        const endAbs = Math.abs(pf);

        const ratePerStep = Math.pow(endAbs / startAbs, 1 / totalTime) - 1;

        const x = Array.from({ length: samples + 1 }, (_, i) => (totalTime * i) / samples);
        const y = x.map((t) => sign * startAbs * Math.pow(1 + ratePerStep, t));

        return {
            x,
            y,
            isValid: true,
            maxY: Math.max(...y),
            minY: Math.min(...y)
        };
    };

    const chartSeries = useMemo(() => buildChartSeries(form), [form]);
    const chartSeries2 = useMemo(() => buildChartSeries(form2), [form2]);

    const basePlotRange = useMemo(() => {
        const validSeries = [chartSeries, chartSeries2].filter((series) => series.isValid);

        if (!validSeries.length) {
            return {
                x: [0, GRAPH_DURATION],
                y: [-10, 10]
            };
        }

        const minY = Math.min(...validSeries.map((series) => series.minY));
        const maxY = Math.max(...validSeries.map((series) => series.maxY));
        const span = Math.max(10, maxY - minY);
        const padding = span * 0.15;

        return {
            x: [0, GRAPH_DURATION],
            y: [minY - padding, maxY + padding]
        };
    }, [chartSeries, chartSeries2]);


    const plotRange = useMemo(() => {
        // const [xMin, xMax] = basePlotRange.x;
        // const [yMin, yMax] = basePlotRange.y;

        // const xCenter = (xMin + xMax) / 2;
        // const yCenter = (yMin + yMax) / 2;

        // const xHalf = ((xMax - xMin) * zoomLevel) / 2;
        // const yHalf = ((yMax - yMin) * zoomLevel) / 2;

        // return {
        //     x: [Math.max(0, xCenter - xHalf), xCenter + xHalf],
        //     y: [Math.max(0, yCenter - yHalf), yCenter  + yHalf]
        // }

        const [baseXMin, baseXMax] = basePlotRange.x;
        const [baseYMin, baseYMax] = basePlotRange.y;

        const baseXSpan = baseXMax - baseXMin;
        const baseYSpan = baseYMax - baseYMin;

        const visibleXSpan = baseXSpan * zoomLevel;
        const visisbleYSpan = baseYSpan * zoomLevel;

        const clampedXSpan = Math.min(visibleXSpan, baseXSpan);
        const clampedYSpan = Math.min(visisbleYSpan, baseYSpan);

        const movableX = Math.max(0, baseXSpan - clampedXSpan);
        const movableY = Math.max(0, baseYSpan);

        const xStart = baseXMin + (xPan / 100) * movableX;
        const yStart = baseYMin + ((100 - yPan) / 100) * movableY;

        return {
            x: [xStart, xStart + clampedXSpan],
            y: [yStart, yStart + clampedYSpan]
        }

    }, [basePlotRange, zoomLevel, xPan, yPan]);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        setZoomLevel(1);
        setXPan(50);
        setYPan(50);
    }

    const handleChangeForm2 = (event) => {
        const { name, value } = event.target;

        setForm2((previous) => ({
            ...previous,
            [name]: value
        }));

        setZoomLevel(1);
        setXPan(50);
        setYPan(50);
    };

    const handleZoomIn = () => {
        setZoomLevel((previous) => Math.max(0.2, previous * 0.8));
    }

    const handleZoomOut = () => {
        setZoomLevel((previous) => Math.min(8, previous * 1.25));
    }

    const handleContinuousModalOpen = (event) => {
        setIsContinuousModal(true);
        setIsCurveModal(false);
        setIsPanelOpen(false);
    }

    const handleContinuousModalClose = (event) => {
        setIsContinuousModal(false);
        setIsPanelOpen(true);
    }

    const handleExponentialModalOpen = (event) => {
        setIsExponetialModal(true);
        setIsContinuousModal(false);
        setIsCurveModal(false);
        setIsPanelOpen(false);
    }

    const handleExponentialModalClose = (event) => {
        setIsExponetialModal(false)
        setIsContinuousModal(false);
        setIsPanelOpen(true);
    }

    return (
        <div className="exponential-growth-model">
            {/* <img src={graphBg} alt="Graph Background" /> */}
            <div className="plot-wrapper">
                <Plot
                    data={[
                        ...(chartSeries.isValid
                            ? [
                                {
                                    x: chartSeries.x,
                                    y: chartSeries.y,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Model 1",
                                    line: {
                                        width: 4,
                                        color: "#111",
                                        shape: "spline",
                                        smoothing: 1.2
                                    },
                                    hovertemplate:
                                        "Model 1<br>Step: %{x:.2f}<br>Population: %{y:.2f}<extra></extra>"
                                }
                            ]
                            : []),
                        ...(chartSeries2.isValid
                            ? [
                                {
                                    x: chartSeries2.x,
                                    y: chartSeries2.y,
                                    type: "scatter",
                                    mode: "lines",
                                    name: "Model 2",
                                    line: {
                                        width: 4,
                                        color: "#1d4ed8",
                                        shape: "spline",
                                        smoothing: 1.2
                                    },
                                    hovertemplate:
                                        "Model 2<br>Step: %{x:.2f}<br>Population: %{y:.2f}<extra></extra>"
                                }
                            ]
                            : [])
                    ]}
                    layout={{
                        autosize: true,
                        paper_bgcolor: "#f4f4f4",
                        plot_bgcolor: "#f4f4f4",
                        margin: { t: 30, r: 30, b: 30, l: 30 },
                        showlegend: true,
                        dragmode: false,
                        xaxis: {
                            range: plotRange.x,
                            showgrid: true,
                            gridcolor: "rgba(0,0,0,0.35)",
                            gridwidth: 1,
                            zeroline: true,
                            zerolinecolor: "#000",
                            fixedrange: true,
                            showticklabels: true,
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
                            showticklabels: true,
                            ticks: "",
                            title: ""
                        },
                    }}
                    config={{
                        responsive: true,
                        displayModeBar: false,
                        staticPlot: false
                    }}
                    useResizeHandler
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            <div className="exponential-growth-model-content">
                <button className="btn btn-circle btn-close" type="button" onClick={() => setIsSaveModal(true)}>
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

                    <button className="btn btn-circle btn-cv" onClick={() => setIsCurveModal(true)}>
                        CV
                    </button>
                </div>

                <input type="range" min={0} max={100} value={yPan} onChange={(event) => setYPan(Number(event.target.value))} className="graph-pan-slider graph-pan-slider-y" />
                <input type="range" min={0} max={100} value={xPan} onChange={(event) => setXPan(event.target.value)} className="graph-pan-slider graph-pan-slider-x" />

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
                                        <input type="text" name="initialPopulation" placeholder="Initial Population" value={form.initialPopulation} onChange={handleChange} />
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
                                {!chartSeries.isValid && (
                                    <p className="graph-error">
                                        Use two positive values or two negative values. Exponential curvees cannot cross zero.
                                    </p>
                                )}
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

                {isSaveModal && (
                    <div className="save-modal-overlay">
                        <div className="save-model-modal">
                            <div className="save-model-header">
                                <button type="button" className="save-model-close" onClick={() => setIsSaveModal(false)}>
                                    <IoClose />
                                </button>
                                <h2>Saving Model</h2>
                            </div>

                            <div className="save-model-body">
                                <input type="text" placeholder="Name of graph" className="save-model-input" />

                                <div className="save-model-actions">
                                    <button type="button" className="save-model-btn save-btn">
                                        Save
                                    </button>
                                    <button type="button" className="save-model-btn cancel-btn" onClick={() => navigate("/design-models")}>
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {isCurveModal && (
                    <div className="curve-modal-overlay save-modal-overlay">
                        <div className="save-model-modal" ref={curveModalRef}>
                            <div className="save-model-header">
                                <h2>Curve Fitting Models</h2>
                            </div>

                            <div className="save-model-body">
                                <div className="save-model-actions">
                                    <button type="button" className="save-model-btn save-btn" onClick={handleContinuousModalOpen}>
                                        Continuous Growth
                                    </button>
                                    <button type="button" className="save-model-btn save-btn" onClick={handleExponentialModalOpen}>
                                        Population Growth rate
                                    </button>
                                    <button type="button" className="save-model-btn save-btn">
                                        Logistic Growth
                                    </button>
                                    <button type="button" className="save-model-btn save-btn">
                                        Discrete Growth
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {
                    isContinuousModal && (
                        <div className="continuous-growth-modal exponential-growth-panel">
                            <div className="exponential-growth-panel-header">
                                <span onClick={handleContinuousModalClose}>
                                    <IoRemove size={25} />
                                </span>
                                <h2>Continuous Growth Model</h2>
                                <button className="btn-minimize" onClick={handleContinuousModalClose}><IoChevronDown size={25} /></button>
                            </div>

                            <div className="exponential-growth-panel-body">
                                <form className="exponential-growth-panel-form" onSubmit={(event) => event.preventDefault()}>
                                    <div className="form-group">
                                        <input type="text" name="time" placeholder="Time values (e.g., (0,1,2,3))" />
                                    </div>
                                    <div className="form-group">
                                        <select name="time-format" className="continuous-select">
                                            <option value="">Select time format</option>
                                            <option value="years">Years</option>
                                            <option value="months">Months</option>
                                            <option value="days">Days</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="number" name="initialPopulation" placeholder="Initial Population" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="growth-rate" placeholder="Growth rate" />
                                    </div>
                                </form>
                                {!chartSeries.isValid && (
                                    <p className="graph-error">
                                        Use two positive values or two negative values. Exponential curvees cannot cross zero.
                                    </p>
                                )}
                            </div>

                        </div>
                    )
                }

                {
                    isExponentialModal && (
                        <div className="exponential-growth-panel exponential-growth-panel-2">
                            <div className="exponential-growth-panel-header">
                                <span>
                                    {/* <IoRemove size={25}/> */}
                                </span>
                                <h2>Population Growth Model</h2>
                                <button className="btn-minimize" onClick={handleExponentialModalClose}><IoChevronDown size={25} /></button>
                            </div>

                            <div className="exponential-growth-panel-body">
                                <form className="exponential-growth-panel-form" onSubmit={(event) => event.preventDefault()}>
                                    <div className="form-group">
                                        <input type="text" name="initialPopulation" placeholder="Initial Population" value={form2.initialPopulation} onChange={handleChangeForm2} />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" name="finalPopulation" placeholder="Final Population" value={form2.finalPopulation} onChange={handleChangeForm2} />
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
                                {!chartSeries.isValid && (
                                    <p className="graph-error">
                                        Use two positive values or two negative values. Exponential curvees cannot cross zero.
                                    </p>
                                )}
                            </div>

                        </div>
                    )
                }

            </div>
        </div>
    )
}