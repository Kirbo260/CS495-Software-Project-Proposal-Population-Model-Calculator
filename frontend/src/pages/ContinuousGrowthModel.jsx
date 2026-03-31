import { useState } from "react";
import Plot from "react-plotly.js";
import "../cssPages/modeldesigns.css";

function ContinuousGrowth() {
  const [time, setTime] = useState("");
  const [initial, setInitial] = useState("");
  const [rate, setRate] = useState("");
  const [data, setData] = useState(null);
  const [final, setFinal] = useState("");
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
      growthRate: rate || "",
      birthRate: birthRate || "",
      deathRate: deathRate || ""
    });

    const response = await fetch(
      `/api/continuousgrowth?${params.toString()}`
    );

    const result = await response.json();
    setData(result);
  };

  return (
    <div className="model-page">
      <h2>Continuous Growth Calculator</h2>

      <button className="home-btn">
        <a href="/">HomePage</a>
      </button>

      <form className="model-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Time values (e.g., 0,1,2,3)"
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
        />
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
        <input
          type="number"
          placeholder="Final Population"
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
              {data.table.rows.map(row => (
                <tr key={row.time}>
                  <td>{row.time}</td>
                  <td>{row.population.toFixed(2)}</td>
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
                mode: "lines+markers",
                //marker: { color: "#FFD700" }, // gold
                line: { color: "#8B0000", width: 3 }, // dark red/burgundy
                showlegend: false // Hide the line by default, only show points
              },
              {
                x: data.table.rows.map(row => row.time),
                y: data.table.rows.map(row => row.population),
                type: "scatter",
                mode: "markers",
                marker: { color: "#FFD700", size: 10 } // cyan points for calculated values
              }
            ]}
            layout={{
              title: "Continuous Growth",
              plot_bgcolor: "#ffffff",
              paper_bgcolor: "#1a1a1a",
              plot_linecolor: "#000000",
              plot_gridcolor: "#000000",
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

export default ContinuousGrowth;