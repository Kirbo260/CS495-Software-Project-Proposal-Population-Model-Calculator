import PopulationGrowthRate from "../services/PopulationGrowthRate.js";
import ExponentialGrowthModel from "../services/ExponentialGrowthModel.js";
import LogisticGrowthModel from "../services/LogisticGrowthModel.js";

export function setupRoutes(app) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });


  app.get('/api/populationgrowthrate', (req, res) => {
    const initialPopulation = Number(req.query.initialPopulation);
    const finalPopulation = Number(req.query.finalPopulation);
    const populationGrowthRate = new PopulationGrowthRate(initialPopulation, finalPopulation);
    const capitalGrowthRate = populationGrowthRate.capitalGrowthRate();
    try {
      const result = populationGrowthRate.percentageGrowthRate();
      res.json({ result, capitalGrowthRate });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get('/api/exponentialgrowth', (req, res) => {
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

  app.get('/api/exponentialgrowth/missingrate', (req, res) => {
    const { time, birthRate, deathRate } = req.query;

    if (!time || birthRate === undefined || deathRate === undefined) {
      return res.status(400).json({
        error: "time, birthRate, and deathRate are required"
      });
    }

    const timeArray = time.split(",").map(Number);
    const initial = Number(req.query.initial);
    const bRate = Number(birthRate);
    const dRate = Number(deathRate);

    if (timeArray.some(isNaN) || isNaN(bRate) || isNaN(dRate)) {
      return res.status(400).json({
        error: "All parameters must be valid numbers"
      });
    }

    try {
      const model = ExponentialGrowthModel.fromMissingRate(
        initial,
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

  app.get('/api/logisticgrowth', (req, res) => {
    const initial = Number(req.query.initial);
    const rate = Number(req.query.rate);
    const capacity = Number(req.query.capacity);
    const time = req.query.time.split(",").map(Number);

    if (!req.query.time) {
      return res.status(400).json({ error: "Time is required" }); // so that time is required and we can split it into an array later
    }

    if (isNaN(initial) || isNaN(rate) || isNaN(capacity) || time.some(isNaN)) {
      return res.status(400).json({
        error: "initial, rate, capacity, and time must be valid numbers"
      });
    }

    try {
      const model = new LogisticGrowthModel(initial, rate, capacity);
      const population = model.populationAtTime(time);

      res.json({
        headers: ["Time", "Population"], // prints the headers for the table
        rows: population
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

app.get('/api/discretegrowth', (req, res) => {
  const initialPopulation = Number(req.query.initialPopulation);
  const finalPopulation = req.query.finalPopulation ? Number(req.query.finalPopulation) : null;
  const growthRate = req.query.growthRate ? Number(req.query.growthRate) : null;
  const time = req.query.time ? req.query.time.split(",").map(Number) : null;
  const modelType = req.query.modelType; // "growth" or "decay"

  if (!modelType || (modelType !== "growth" && modelType !== "decay")) {
    return res.status(400).json({ error: "modelType must be 'growth' or 'decay'" });
  }

  try {
    const model = new DiscreteGrowthModel(initialPopulation, finalPopulation, growthRate, time, modelType);
    const result = model.DiscreteSolver(modelType);

    res.json({
      headers: ["Time", "Population"],
      rows: result
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

}

export default setupRoutes;