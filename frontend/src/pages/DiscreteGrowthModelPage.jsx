import { useState } from "react";
import Plot from "react-plotly.js";

function DiscreteGrowth() {
    const [time, setTime] = useState("");
    const [initial, setInitial] = useState("");
    const [final, setFinal] = useState("");
    const [growthRate, setGrowthRate] = useState("");
    const [model, setModel] = useState("growth");
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `/api/discretegrowth?time=${time}&initialPopulation=${initial || ""}&finalPopulation=${final || ""}&growthRate=${growthRate || ""}&modelType=${model}`
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
                            {data.rows.map(([t, pop]) => (
                                <tr key={t}>
                                    <td>{t}</td>
                                    <td>{Number(pop).toFixed(2)}</td>
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
                                x: data.rows.map(row => row[0]),
                                y: data.rows.map(row => row[1]),
                                type: 'scatter',
                                model: 'lines+markers',
                                name: model === "growth" ? "Growth" : "Decay",
                                marker: { color: "#FFD700" }, // gold
                                line: { color: "#8B0000", width: 3 } // dark red/burgundy
                            },
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