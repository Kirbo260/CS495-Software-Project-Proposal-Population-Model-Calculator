import PopulationGrowthRate from "../services/PopulationGrowthRate.js";
import ContinuousGrowthModel from "../services/ContinuousGrowthModel.js";
import LogisticGrowthModel from "../services/LogisticGrowthModel.js";
import DiscreteGrowthModel from "../services/DiscreteGrowthModel.js";
import EMComparison from "../services/EMComparison.js";
import PredatorPreyModel from "../services/PredatorPrey.js";
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
            time, population
          }))
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/logisticgrowth', ApiHelper ,(req, res) => {
    const { initialPopulation, finalPopulation, carryingCapacity, growthRate, birthRate, deathRate, time, timeFormat } = req.ApiHelper;

    /* if (isNaN(initialPopulation) || isNaN(growthRate) || isNaN(carryingCapacity) || time.some(isNaN)) {
      return res.status(400).json({
        error: "initial, rate, capacity, and time must be valid numbers"
      });
    }*/

    try {
      const model = new LogisticGrowthModel(
        initialPopulation,
        finalPopulation,
        carryingCapacity,
        growthRate,
        birthRate,
        deathRate,
        time,
        timeFormat);
      const population = model.LogisticSolver();

      res.json({
        table: {
          headers: ["Time", "Population"], // prints the headers for the table
          rows: population.results.map(([time, population]) => ({ // maps the results to an array of objects with time and population properties
            time,
            population
          }))
        }, 
        graph: {
          rows: population.graphResults.map(([time, population]) => ({ // maps the graph results to an array of objects with time and population properties
            time,
            population
          }))
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/discretegrowth', ApiHelper, (req, res) => {
    const { initialPopulation, finalPopulation, growthRate, time, timeFormat, modelType, birthRate, deathRate } = req.ApiHelper;

    if (!modelType || (modelType !== "growth" && modelType !== "decay")) {
      return res.status(400).json({ error: "modelType must be 'growth' or 'decay'" });
    }

    try {
      const model = new DiscreteGrowthModel(
        initialPopulation,
        finalPopulation,
        growthRate,
        birthRate,
        deathRate,
        modelType,
        time,
        timeFormat);
      const result = model.DiscreteSolver();

    res.json({
        table: {
          headers: ["Time", "Population"], // prints the headers for the table
          rows: result.results.map(([time, population]) => ({ // maps the results to an array of objects with time and population properties
            time,
            population
          }))
        }, 
        graph: {
          rows: result.graphResults.map(([time, population]) => ({ // maps the graph results to an array of objects with time and population properties
            time,
            population
          }))
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/emcomparison', ApiHelper, (req, res) => {
    const { initialPopulation, finalPopulation, growthRate, time, timeFormat,
            carryingCapacity, modelType, actualValues } = req.ApiHelper;

    try {
      const comparison = new EMComparison(
        initialPopulation,
        finalPopulation,
        growthRate,
        time,
        timeFormat,
        carryingCapacity,
        modelType,
        actualValues
      );

    //Array.isArray(actualValues) ? actualValues : [actualValues]; // Ensure it is an array for the EMComparison class  

      const result = comparison.ModelGrowthComparison();
      
      res.json({ rows: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/predatorprey', ApiHelper, (req, res) => {
    const { a_prey, b_predation, c_predator, d_reproduction, time, timeChange, finalTime, preyInitial, predatorInitial } = req.ApiHelper;

    try {
      const model = new PredatorPreyModel(
        a_prey,
        b_predation,
        c_predator,
        d_reproduction,
        time,
        finalTime,
        timeChange,
        preyInitial,
        predatorInitial
      );

      console.log({
  a_prey,
  b_predation,
  c_predator,
  d_reproduction,
  timeChange,
  finalTime,
  preyInitial,
  predatorInitial
});
      const result = model.LoktaVolterraSolver();

 res.json({
  table: {
    headers: ["Time", "Prey Population", "Predator Population"],
    rows: result.time.map((t, i) => ({
      time: t,
      preyPopulation: Number(result.prey[i]).toFixed(4),
      predatorPopulation: Number(result.predator[i]).toFixed(4)
    }))
  },
  graph: {
    rows: result.time.map((t, i) => ({
      time: t,
      preyPopulation: Number(result.prey[i]).toFixed(2),
      predatorPopulation: Number(result.predator[i]).toFixed(2)
    }))
  }
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