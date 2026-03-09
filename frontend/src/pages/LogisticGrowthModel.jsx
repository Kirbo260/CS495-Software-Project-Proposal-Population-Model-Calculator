import { useState } from "react";
import Plot from "react-plotly.js";

function LogisticGrowth() {
    const [time, setTime] = useState("");
    const [initial, setInitial] = useState("");
    const [rate, setRate] = useState("");
    const [carryingCapacity, setCarryingCapacity] = useState("");
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `/api/logisticgrowth?time=${time}&initial=${initial}&rate=${rate}&carryingCapacity=${carryingCapacity}`
        );

        const result = await response.json();
        setData(result); // Store the result for visualization
    };

    return (
        <div>
            <h2>Logistic Growth Calculator</h2>
            <button>
                <a href="/">HomePage</a>
            </button>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Time values (0,1,2,3)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
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
                />
                <input
                    type="number"
                    placeholder="Carrying capacity"
                    value={carryingCapacity}
                    onChange={(e) => setCarryingCapacity(e.target.value)}
                />
                <button type="submit">Calculate</button>
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

            {/* Visualization using Plotly */}
            {data && (
                <Plot
                    data={[
                        {
                            x: data.rows.map(row => row[0]),
                            y: data.rows.map(row => row[1]),
                            type: "scatter",
                            mode: "lines+markers",
                            name: "Logistic Growth"
                        }
                    ]}
                    layout={{ title: "Logistic Growth" }}
                />
            )}
        </div>
    );
}

export default LogisticGrowth;