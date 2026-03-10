import { useState } from "react";

function PopulationGrowth() {
  const [initial, setInitial] = useState("");
  const [final, setFinal] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `/api/populationgrowthrate?initialPopulation=${initial}&finalPopulation=${final}`
    );
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="model-page">
      <h2>Population Growth Calculator</h2>

      <button className="home-btn">
        <a href="/">HomePage</a>
      </button>

      <form className="model-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Initial population"
          value={initial}
          onChange={(e) => setInitial(e.target.value)}
        />

        <input
          type="text"
          placeholder="Final population"
          value={final}
          onChange={(e) => setFinal(e.target.value)}
        />

        <button type="submit" className="calculate-btn">Calculate</button>
      </form>

      {data && (
        <div className="results-section">
          <h3>Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default PopulationGrowth;
