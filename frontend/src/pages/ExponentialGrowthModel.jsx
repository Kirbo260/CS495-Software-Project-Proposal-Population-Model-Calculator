import { useState } from "react";
import Plot from "react-plotly.js";
import "../cssPages/modeldesigns.css";

function ExponentialGrowth() {
  const [time, setTime] = useState("");
  const [initial, setInitial] = useState("");
  const [rate, setRate] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `/api/exponentialgrowth?time=${time}&initial=${initial}&rate=${rate}`
    );

    const result = await response.json();
    setData(result);
  };

  return (
    <div className="model-page">
      <h2>Exponential Growth Calculator</h2>

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
              {data.rows.map(([t, pop]) => (
                <tr key={t}>
                  <td>{t}</td>
                  <td>{Number(pop).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Visualization:</h3>
          <Plot
            data={[
              {
                x: data.rows.map(row => row[0]),
                y: data.rows.map(row => row[1]),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "#FFD700" }, // gold
                line: { color: "#8B0000", width: 3 } // dark red/burgundy
              },
            ]}
            layout={{
              title: "Exponential Growth",
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

export default ExponentialGrowth;