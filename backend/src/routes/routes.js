import PopulationGrowthRate from "../services/PopulationGrowthRate.js";
import ContinuousGrowthModel from "../services/ContinuousGrowthModel.js";
import LogisticGrowthModel from "../services/LogisticGrowthModel.js";
import DiscreteGrowthModel from "../services/DiscreteGrowthModel.js";
import ApiHelper from "../utils.js/ApiHelper.js";
import { client } from '../../db.js';

export function setupRoutes(app) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });


  app.get('/api/populationgrowthrate', ApiHelper, (req, res) => {
    const {initialPopulation, finalPopulation } = req.ApiHelper;
  
    const populationGrowthRate = new PopulationGrowthRate(initialPopulation, finalPopulation);
    const capitalGrowthRate = populationGrowthRate.capitalGrowthRate();
    try {
      const result = populationGrowthRate.percentageGrowthRate();
      res.json({ result, capitalGrowthRate });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get('/api/continuousgrowth', ApiHelper, (req, res) => {
    const { initialPopulation, growthRate, time, timeFormat,
            finalPopulation, birthRate, deathRate } = req.ApiHelper;
    try {
      const model = new ContinuousGrowthModel(
        initialPopulation,
        finalPopulation,
        growthRate,
        birthRate,
        deathRate,
        time,
        timeFormat
      );

      const result = model.ContinuousSolver();

      res.json({
        table: { // result is the array of results for the time points provided in the query
          headers: ["Time", "Population"],
          rows: result.results.map(([time, population]) => ({
            time, population
          }))
        },
        graph: { // graphResults is the array of results for dense time points for plotting the graph
          rows: result.graphResults.map(([time, population]) => ({ 
            time,
            population
          }))
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/logisticgrowth', ApiHelper ,(req, res) => {
    const initialPopulation = req.query.initialPopulation
      ? Number(req.query.initialPopulation) : null; // initial population can be null if we are solving for it
    const finalPopulation = req.query.finalPopulation ? Number(req.query.finalPopulation) : null;
    const growthRate = req.query.growthRate ? Number(req.query.growthRate) : null;
    const carryingCapacity = req.query.carryingCapacity ? Number(req.query.carryingCapacity) : null;
    const time = req.query.time
      ? req.query.time.includes(",")
        ? req.query.time.split(",").map(Number)
        : Number(req.query.time)
      : null; // time can be a single number or a comma-separated list of numbers

    /* if (isNaN(initialPopulation) || isNaN(growthRate) || isNaN(carryingCapacity) || time.some(isNaN)) {
      return res.status(400).json({
        error: "initial, rate, capacity, and time must be valid numbers"
      });
    }*/

    try {
      const model = new LogisticGrowthModel(initialPopulation, growthRate, carryingCapacity, time, finalPopulation);
      const population = model.LogisticSolver();

      res.json({
        headers: ["Time", "Population"], // prints the headers for the table
        rows: population
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/discretegrowth', ApiHelper, (req, res) => {

    const initialPopulation = req.query.initialPopulation
      ? Number(req.query.initialPopulation) : null; // initial population can be null if we are solving for it
    const finalPopulation = req.query.finalPopulation ? Number(req.query.finalPopulation) : null;
    const growthRate = req.query.growthRate ? Number(req.query.growthRate) : null;
    const time = req.query.time
      ? req.query.time.includes(",")
        ? req.query.time.split(",").map(Number)
        : Number(req.query.time)
      : null; // time can be a single number or a comma-separated list of numbers
    const modelType = req.query.modelType; // "growth" or "decay"

    if (!modelType || (modelType !== "growth" && modelType !== "decay")) {
      return res.status(400).json({ error: "modelType must be 'growth' or 'decay'" });
    }

    try {
      const model = new DiscreteGrowthModel(initialPopulation, finalPopulation, growthRate, time, modelType);
      const result = model.DiscreteSolver();

      res.json({
        headers: ["Time", "Population"],
        rows: result
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const result = await client.query("SELECT * FROM users");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
    }
  });
}


export default setupRoutes;