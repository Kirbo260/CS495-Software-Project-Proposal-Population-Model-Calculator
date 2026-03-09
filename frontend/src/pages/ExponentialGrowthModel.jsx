import { useState } from "react";
import Plot from "react-plotly.js";

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
    <div>
      <h2>Exponential Growth Calculator</h2>

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

      {/* Use Plotly or any other charting library to visualize the data */}
      {data && (
        <div>
          <h3>Visualization:</h3>
          <Plot
            data={[
              {
                x: data.rows.map(row => row[0]),
                y: data.rows.map(row => row[1]),
                type: "scatter",
                mode: "lines+markers",
              },
            ]}
            layout={{ title: "Exponential Growth" }}
          />
        </div>
      )}
    </div>
  );
}

export default ExponentialGrowth;
