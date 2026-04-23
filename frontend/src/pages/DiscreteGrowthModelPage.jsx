import { useState } from "react";
import Plot from "react-plotly.js";
import ModalInputs from "../components/ModalInputs";

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
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [csvFile, setCsvFile] = useState(null);

    // check if user is logged in to conditionally render the save button
    // Outside so handleSave can access it and conditionally render the save button
    const isLoggedIn = !!localStorage.getItem("token");

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

    const handleCSVUpload = async () => {
        if (!csvFile) {
            alert("Please select a CSV file");
            return;
        }

        const formData = new FormData();
        formData.append("file", csvFile);

        try {
            const response = await fetch(
                "/api/upload/process/discrete/Regular",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            // directly update graph + table
            setData(result);

            // optionally show save button
            setCount(1);

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const handleSave = (mdata) => {
        // Open the modal to input model details
        const modelData = ({
            name: mdata.name,
            description: mdata.description,
            version: mdata.version,
            inputs: {
                time: time || "",
                timeFormat: timeFormat || "none",
                initialPopulation: initial || "",
                finalPopulation: final || "",
                growthRate: growthRate || "",
                modelType: model || "growth",
                birthRate: birthRate || "",
                deathRate: deathRate || ""
            }
        });

        // Send the model data to the backend to save in the database
        fetch("/api/models", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(modelData)
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Model saved successfully!", data);
                setIsModalOpen(false);
            })
            .catch((err) => {
                console.error("Error saving model:", err);
                alert("Failed to save model. Please try again.");
            });
    };


    // Adding animation to the graph using Plotly's animation features
    const frames = data
        ? data.graph.rows.map((_, i) => ({
            name: `frame-${i}`,
            data: [
                {
                    x: data.graph.rows.slice(0, i + 1).map(r => r.time),
                    y: data.graph.rows.slice(0, i + 1).map(r => r.population),
                },
                {
                    x: data.table.rows.slice(0, i + 1).map(r => r.time),
                    y: data.table.rows.slice(0, i + 1).map(r => r.population),
                }
            ]
        })) : [];

    return (
        <div className="model-page">
            <h2>Discrete Growth/Decay Calculator</h2>

            <button className="home-btn">
                <a href="/">HomePage</a>
            </button>

            <div className="csv-upload-section">
                <h3>Upload CSV Dataset</h3>

                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                />

                <button onClick={handleCSVUpload} className="calculate-btn">
                    Upload CSV
                </button>
            </div>

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

                <button type="submit" className="calculate-btn" onClick={() => setCount(1)} >Calculate</button>
            </form>
            {isLoggedIn && count == 1 && (

                <button onClick={() => setIsModalOpen(true)} className="save-btn">
                    Save Model
                </button>
            )}

            <ModalInputs isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSave} />

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
                                x: data.graph.rows.map(r => r.time),
                                y: data.graph.rows.map(r => r.population),
                                type: "scatter",
                                mode: "lines",
                                line: { color: "#8B0000", width: 3 }
                            },
                            {
                                x: data.table.rows.map(r => r.time),
                                y: data.table.rows.map(r => r.population),
                                type: "scatter",
                                mode: "markers",
                                marker: { color: "#FFD700", size: 10 }
                            }
                        ]}
                        frames={frames}
                        layout={{
                            title: "Discrete Growth",
                            plot_bgcolor: "#ffffff",
                            paper_bgcolor: "#1a1a1a",
                            font: { color: "white" },
                            xaxis: { title: "Time" },
                            yaxis: { title: "Population" },

                            updatemenus: [
                                {
                                    type: "buttons",
                                    showactive: false,
                                    buttons: [
                                        {
                                            label: "Play",
                                            method: "animate",
                                            args: [
                                                null,
                                                {
                                                    frame: { duration: 200, redraw: true },
                                                    fromcurrent: true,
                                                    transition: { duration: 100 }
                                                }
                                            ]
                                        },
                                        {
                                            label: "Pause",
                                            method: "animate",
                                            args: [
                                                [null],
                                                {
                                                    mode: "immediate",
                                                    frame: { duration: 0 }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }}
                        config={{
                            toImageButtonOptions: {
                                format: "png",
                                filename: "discrete_growth_graph",
                                height: 600,
                                width: 800,
                                scale: 2
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default DiscreteGrowth;