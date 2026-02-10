import { add } from "../services/CarryingCapacity.js";
import { subtract } from "../services/ContinuousGrowthModel.js";
import PopulationGrowthRate from "../services/PopulationGrowthRate.js";
import ExponentialGrowthModel from "../services/ExponentialGrowthModel.js";

export function setupRoutes(app) {
    app.get("/", (req, res) => {
  res.send("Hello World");
});

  app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "a and b must be numbers" });
    }
    const result = add(a, b);
    res.json({ result });
  });

  app.get('/subtract', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "a and b must be numbers" });
    }
    const result = subtract(a, b);
    res.json({ result });
  });   

  app.get('/populationgrowthrate', (req, res) => {
    const initialPopulation = Number(req.query.initialPopulation);
    const finalPopulation = Number(req.query.finalPopulation);
    const populationGrowthRate = new PopulationGrowthRate(initialPopulation, finalPopulation);
    const capitalGrowthRate = populationGrowthRate.capitalGrowthRate();
    try {
      const result = populationGrowthRate.percentageGrowthRate();
      res.json({ result, capitalGrowthRate});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });   

app.get("/exponentialgrowth", (req, res) => {
  if (!req.query.time) {
    return res.status(400).json({
      error: "Query parameter 'time' is required (e.g. ?time=0,1,2,3)"
    });
  }

  const time = req.query.time.split(",").map(Number);
  const initial = Number(req.query.initial);
  const rate = Number(req.query.rate);

  if (time.some(isNaN)) {
    return res.status(400).json({
      error: "Time must be a comma-separated list of numbers"
    });
  }

  try {
    const model = ExponentialGrowthModel.NotMissingRate(
      initial,
      rate,
      time,
      null,
      null
    );

    const data = model.calculatePopulation();

    res.json({
      headers: ["Time", "Population"],
      rows: data
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/exponentialgrowth/missingrate", (req, res) => {
  const { time, birthRate, deathRate } = req.query;

  if (!time || birthRate === undefined || deathRate === undefined) {
    return res.status(400).json({
      error: "time, birthRate, and deathRate are required"
    });
  }

  const timeArray = time.split(",").map(Number);
  const initial1 = Number(req.query.initial);
  const bRate = Number(birthRate);
  const dRate = Number(deathRate);

  if (timeArray.some(isNaN) || isNaN(bRate) || isNaN(dRate)) {
    return res.status(400).json({
      error: "All parameters must be valid numbers"
    });
  }

  try {
    const model = ExponentialGrowthModel.fromMissingRate(
      initial1,
      timeArray,
      bRate,
      dRate
    );

    const data = model.calculatePopulation();

    res.json({
      headers: ["Time", "Population"],
      rows: data
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

}

export default setupRoutes;