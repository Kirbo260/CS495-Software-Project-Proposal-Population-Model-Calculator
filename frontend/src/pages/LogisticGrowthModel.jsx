import { useState } from "react";
import Plot from "react-plotly.js";

function LogisticGrowth() {
    const [time, setTime] = useState("");
    const [initial, setInitial] = useState("");
    const [rate, setRate] = useState("");
    const [carryingCapacity, setCarryingCapacity] = useState("");
    const [data, setData] = useState(null);
    const [final, setFinal] = useState("")
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
            carryingCapacity: carryingCapacity || "",
            growthRate: rate || "",
            birthRate: birthRate || "",
            deathRate: deathRate || ""
        });

        const response = await fetch(
            `/api/logisticgrowth?${params.toString()}`
        );

        const result = await response.json();
        setData(result); // Store the result for visualization
    };

    return (
        <div className="model-page">
            <h2>Logistic Growth Calculator</h2>

            <button className="home-btn">
                <a href="/">HomePage</a>
            </button>

            <form className="model-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Time values (0,1,2,3)"
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
                    type="number"
                    placeholder="Initial population"
                    value={initial}
                    onChange={(e) => setInitial(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Growth rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                />  <input
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
                <input
                    type="number"
                    placeholder="Carrying capacity"
                    value={carryingCapacity}
                    onChange={(e) => setCarryingCapacity(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Final population"
                    value={final}
                    onChange={(e) => setFinal(e.target.value)}
                />
                <button type="submit" className="calculate-btn">Calculate</button>
            </form>

            {data && (
                <div className="results-section">
                    <h3>Results:</h3>
                    <table className="results-table">
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

                    <h3>Visualization:</h3>
                    <Plot
                        data={[
                            {
                                x: data.graph.rows.map(row => row.time),
                                y: data.graph.rows.map(row => row.population),
                                type: "scatter",
                                mode: "lines",
                                name: "Logistic Growth",
                                line: { color: "#8B0000", width: 3 }, // burgundy line
                                showlegend: false // hide legend for graph results
                            },
                            {
                                x: data.table.rows.map(row => row.time),
                                y: data.table.rows.map(row => row.population),
                                type: "scatter",
                                mode: "markers",
                                name: "Table Results",
                                marker: { color: "#FFD700" }, // gold markers
                            }
                        ]}
                        layout={{
                            title: "Logistic Growth",
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

export default LogisticGrowth;