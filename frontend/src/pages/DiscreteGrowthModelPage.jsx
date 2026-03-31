import { useState } from "react";
import Plot from "react-plotly.js";

function DiscreteGrowth() {
    const [time, setTime] = useState("");
    const [initial, setInitial] = useState("");
    const [final, setFinal] = useState("");
    const [growthRate, setGrowthRate] = useState("");
    const [model, setModel] = useState("growth");
    const [data, setData] = useState(null);
    const [timeFormat, setTimeFormat] = useState("none");
    const [birthRate, setBirthRate] = useState("");
    const [deathRate, setDeathRate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
            time: time || "",
            timeFormat: timeFormat || "none",
            initialPopulation: initial || "",
            finalPopulation: final || "",
            growthRate: growthRate || "",
            modelType: model || "growth",
            birthRate: birthRate || "",
            deathRate: deathRate || ""
        });
        const response = await fetch(
            `/api/discretegrowth?${params.toString()}`
        );
        const result = await response.json();
        setData(result);
    };

    return (
        <div className="model-page">
            <h2>Discrete Growth/Decay Calculator</h2>

            <button className="home-btn">
                <a href="/">HomePage</a>
            </button>

            <form className="model-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Time values (0,1,2,3) or single value (e.g. 5)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <select
                    className="model-select"
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                >
                    <option value="none">Select time format</option>
                    <option value="s">Seconds</option>
                    <option value="m">Minutes</option>
                    <option value="h">Hours</option>
                    <option value="d">Days</option>
                    <option value="w">Weeks</option>
                    <option value="mo">Months</option>
                    <option value="y">Years</option>
                </select>
                <input
                    type="text"
                    placeholder="Initial Population"
                    value={initial}
                    onChange={(e) => setInitial(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Final Population"
                    value={final}
                    onChange={(e) => setFinal(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Growth Rate"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                />
                <select
                    className="model-select"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                >
                    <option value="growth">Growth</option>
                    <option value="decay">Decay</option>
                </select>
                <input
                    type="number"
                    placeholder="Birth rate"
                    value={birthRate}
                    onChange={(e) => setBirthRate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Death rate"
                    value={deathRate}
                    onChange={(e) => setDeathRate(e.target.value)}
                />

                <button type="submit" className="calculate-btn">
                    Calculate
                </button>
            </form>

            {data && (
                <div>
                    <h3>Results:</h3>
                    <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.table.rows.map((row) => (
                                <tr key={row.time}>
                                    <td>{row.time}</td>
                                    <td>{Number(row.population).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Use Plotly or any other charting library to visualize the data */}
            {data && (
                <div>
                    <h3>Visualization:</h3>
                    <Plot
                        data={[
                            {
                                x: data.graph.rows.map(row => row.time),
                                y: data.graph.rows.map(row => row.population),
                                type: 'scatter',
                                mode: 'lines',
                                name: model === "growth" ? "Growth" : "Decay",
                               // marker: { color: "#00f2ff" }, // gold
                                line: { color: "#8B0000", width: 3 }, // dark red/burgundy
                                showlegend: false // hide legend for graph results
                            },
                            {
                                x: data.table.rows.map(row => row.time),
                                y: data.table.rows.map(row => row.population),
                                type: 'scatter',
                                mode: 'markers',
                                name: 'Population over time',
                                line: { color: "#FFD700", size: 10, dash: 'dash' } // gold dashed line for the graph results
                            }
                        ]}
                        layout={{
                            title: "Discrete Growth/Decay",
                            plot_bgcolor: "#1a1a1a",
                            paper_bgcolor: "#1a1a1a",
                            font: { color: "white" },
                            xaxis: { title: "Time" },
                            yaxis: { title: "Population" },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default DiscreteGrowth;