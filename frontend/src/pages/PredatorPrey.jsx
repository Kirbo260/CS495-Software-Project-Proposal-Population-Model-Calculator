import { useState } from "react";
import "../cssPages/modeldesigns.css";
import Plot from "react-plotly.js";
import ModalInputs from "../components/ModalInputs";


export default function PredatorPrey() {

    const [a_prey, setAPrey] = useState(0); // Growth rate of prey (a)
    const [b_predation, setBPredation] = useState(0); // Rate at which predators consume prey (b)
    const [c_predator, setCPredator] = useState(0); // Growth rate of predators per consumed prey (c)
    const [d_reproduction, setDReproduction] = useState(0); // Reproduction rate of predators (d)
    const [time, setTime] = useState(0); // Initial time
    const [timeChange, setTimeChange] = useState(0); // Time step
    const [finalTime, setFinalTime] = useState(0); // Final time
    const [preyInitial, setPreyInitial] = useState(0); // Initial prey population
    const [predatorInitial, setPredatorInitial] = useState(0); // Initial predator population
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);

    // check if user is logged in to conditionally render the save button
    // Outside so handleSave can access it and conditionally render the save button
    const isLoggedIn = !!localStorage.getItem("token");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
            a_prey: a_prey,
            b_predation: b_predation,
            c_predator: c_predator,
            d_reproduction: d_reproduction,
            time: time,
            timeChange: timeChange,
            finalTime: finalTime,
            preyInitial: preyInitial,
            predatorInitial: predatorInitial
        });

        const response = await fetch(
            `/api/predatorprey?${params.toString()}`
        );

        if (response.ok) {
            const result = await response.json();
            setData(result);
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    };

    const handleSave = (mdata) => {
        // Open the modal to input model details
        const modelData = ({
            name: mdata.name,
            description: mdata.description,
            version: mdata.version,
            inputs: {
                a_prey: a_prey,
                b_predation: b_predation,
                c_predator: c_predator,
                d_reproduction: d_reproduction,
                time: time,
                timeChange: timeChange,
                finalTime: finalTime,
                preyInitial: preyInitial,
                predatorInitial: predatorInitial
            }
        });

        console.log("FINAL MODEL:", modelData);
        console.log("TOKEN:", localStorage.getItem("token"));

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
                console.log("Model saved:", data);
                alert("Model saved successfully!");
            })
            .catch((error) => {
                console.error("Error saving model:", error);
                alert("Failed to save model.");
            });
    };

    // Adding animation to the graph using Plotly's animation features
    const frames = data
        ? data.graph.rows.map((_, i) => ({
            name: `frame-${i}`,
            data: [
                {
                    x: data.graph.rows.slice(0, i + 1).map(r => r.time),
                    y: data.graph.rows.slice(0, i + 1).map(r => r.preyPopulation),
                },
                {
                    x: data.graph.rows.slice(0, i + 1).map(r => r.time),
                    y: data.graph.rows.slice(0, i + 1).map(r => r.predatorPopulation),
                }
            ]
        })) : [];



    return (
        <div className="model-page">
            <h1>Predator-Prey Model</h1>
            <form onSubmit={handleSubmit} className="model-form">
                Prey Growth Rate (a):
                <input type="number" value={a_prey} onChange={(e) => setAPrey(e.target.value)} />

                Predation Rate (b):
                <input type="number" value={b_predation} onChange={(e) => setBPredation(e.target.value)} />

                Predator Death Rate (c):
                <input type="number" value={c_predator} onChange={(e) => setCPredator(e.target.value)} />

                Predator Reproduction Rate (d):
                <input type="number" value={d_reproduction} onChange={(e) => setDReproduction(e.target.value)} />

                Initial Time:
                <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />

                Time Step:
                <input type="number" value={timeChange} onChange={(e) => setTimeChange(e.target.value)} />

                Final Time:
                <input type="number" value={finalTime} onChange={(e) => setFinalTime(e.target.value)} />

                Initial Prey Population:
                <input type="number" value={preyInitial} onChange={(e) => setPreyInitial(e.target.value)} />

                Initial Predator Population:
                <input type="number" value={predatorInitial} onChange={(e) => setPredatorInitial(e.target.value)} />

                <button type="submit" className="calculate-btn" onClick={() => setCount(1)}>Run Model</button>
            </form>


            {isLoggedIn && count == 1 && (

                <button onClick={() => setIsModalOpen(true)} className="save-btn">
                    Save Model
                </button>
            )}

            <ModalInputs isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSave} />



            {data && (
                <div>
                    <h2>Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Prey Population</th>
                                <th>Predator Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.table.rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.time}</td>
                                    <td>{row.preyPopulation}</td>
                                    <td>{row.predatorPopulation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Graph Data</h2>
                    <Plot
                        data={[
                            {
                                x: data.graph.rows.map(r => r.time),
                                y: data.graph.rows.map(r => r.preyPopulation),
                                type: 'scatter',
                                mode: 'lines+markers',
                                name: 'Prey Population'
                            },
                            {
                                x: data.graph.rows.map(r => r.time),
                                y: data.graph.rows.map(r => r.predatorPopulation),
                                type: 'scatter',
                                mode: 'lines+markers',
                                name: 'Predator Population'
                            }
                        ]}
                        frames={frames}
                        layout={{
                            title: 'Predator-Prey Model',
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
                                                    frame: { duration: 250, redraw: true },
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
                                filename: "predator_prey_graph",
                                height: 600,
                                width: 800,
                                scale: 2
                            }
                        }}

                    />

                </div>
            )}


        </div>
    )
}