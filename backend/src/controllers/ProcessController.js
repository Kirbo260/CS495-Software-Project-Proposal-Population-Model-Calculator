// Csv controller for handling CSV file uploads and processing for population models
import ContinuousGrowthModel from "../services/ContinuousGrowthModel.js";
import ParameterEstimation from "../services/ParameterEstimation.js";
import DiscreteGrowthModel from "../services/DiscreteGrowthModel.js";
import LogisticGrowthModel from "../services/LogisticGrowthModel.js";
import EMComparison from "../services/EMComparison.js";
import PredatorPrey from "../services/PredatorPrey.js";

export const emProcessCSV = async (req, res) => {
    console.log(" CONTROLLER HIT");
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    const validType = req.params.validType;
    const time = data.map(d => Number(d.time)) || null;
    const population = data.map(d => Number(d.population));
    let modelTypeForPM = "continuous"; // For now, we are only implementing parameter estimation for the continuous growth model. We can extend this to other models later.

    // debug log the extracted time and population data to see what it looks like
    console.log("Extracted time data:", time);
    console.log("Extracted population data:", population);

    const parameterEstimation = new ParameterEstimation(time, population, modelTypeForPM);
    console.log("Still working");
    const parameters = parameterEstimation.estimateParameters();

    let initialPopulation = population[0];
    let finalPopulation = null; // this is the predicted final population value
    let growthRate = parameters.growthRate;
    let carryingCapacity = parameters.carryingCapacity || null; // Only for Logistic model
    let timeFormat = "none"; 
    let actualValues = population; // Use the actual population values for EM comparison
    let modelTypeForEM = "continuous"; // Pass the model type to EMComparison for accurate error metric calculation

    const emComparison = new EMComparison(
        initialPopulation, 
        finalPopulation,
        growthRate, 
        time, 
        timeFormat,
        carryingCapacity, 
        modelTypeForEM, 
        actualValues);
    const emResults = emComparison.ModelGrowthComparison();

    console.log("EM Comparison Results:", emResults);

    return res.status(200).json({
        message: "Processing successful",
        parameters: parameters,
        emResults: emResults
    });
}

export const conProcessCSV = async (req, res) => {
    console.log(" CONTROLLER HIT");
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    // Convert to numbers to prevent error in calculations
    const time = data.map(d => Number(d.time)) || null;
    const population = data.map(d => Number(d.population));

    // debug log the extracted time and population data to see what it looks like
    console.log("Extracted time data:", time);
    console.log("Extracted population data:", population);

    const estimation = new ParameterEstimation(time, population, "continuous");
    console.log("Still working");
    const parameters = estimation.estimateParameters();

    let initialPopulation = population[0];
    let finalPopulation = null; // this is the predicted final population value
    let growthRate = parameters.r;
    let timeFormat = "none"; 
    let actualValues = population; // Use the actual population values for EM comparison

        const continuousGrowth = new ContinuousGrowthModel(
        initialPopulation, 
        finalPopulation,
        growthRate,
        null,
        null, 
        time, 
        timeFormat);
    const Results = continuousGrowth.ContinuousSolver();

    console.log("Continuous Results:", Results);

    return res.status(200).json({
        message: "Processing successful",
        parameters: parameters,
          table: {
          headers: ["Time", "Population"], // prints the headers for the table
          rows: Results.results.map(([time, population]) => ({ // maps the results to an array of objects with time and population properties
            time,
            population
          }))
        }, 
        graph: {
          rows: Results.graphResults.map(([time, population]) => ({ // maps the graph results to an array of objects with time and population properties
            time,
            population
          }))
        }
    });
}

export const disProcessCSV = async (req, res) => {
     console.log(" CONTROLLER HIT");
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    // Convert to numbers to prevent error in calculations
    const time = data.map(d => Number(d.time)) || null;
    const population = data.map(d => Number(d.population));

    // debug log the extracted time and population data to see what it looks like
    console.log("Extracted time data:", time);
    console.log("Extracted population data:", population);

    const estimation = new ParameterEstimation(time, population, "discrete");
    console.log("Still working");
    const parameters = estimation.estimateParameters();

    let initialPopulation = population[0];
    let finalPopulation = null; // this is the predicted final population value
    let growthRate = parameters.r;
    let timeFormat = "none"; 

        const discreteGrowth = new DiscreteGrowthModel(
        initialPopulation, 
        finalPopulation,
        growthRate,
        null,
        null,
        "growth", 
        time, 
        timeFormat);
    const Results = discreteGrowth.DiscreteSolver();

    console.log("Discrete Results:", Results);

    return res.status(200).json({
        message: "Processing successful",
        parameters: parameters,
           table: {
          headers: ["Time", "Population"], // prints the headers for the table
          rows: Results.results.map(([time, population]) => ({ // maps the results to an array of objects with time and population properties
            time,
            population
          }))
        }, 
        graph: {
          rows: Results.graphResults.map(([time, population]) => ({ // maps the graph results to an array of objects with time and population properties
            time,
            population
          }))
        }
    });
}

export const logProcessCSV = async (req, res) => {
        console.log(" CONTROLLER HIT");
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    // Convert to numbers to prevent error in calculations
    const time = data.map(d => Number(d.time)) || null;
    const population = data.map(d => Number(d.population));

    // debug log the extracted time and population data to see what it looks like
    console.log("Extracted time data:", time);
    console.log("Extracted population data:", population);

    const estimation = new ParameterEstimation(time, population, "logistic");
    console.log("Still working");
    const parameters = estimation.estimateParameters();

    let initialPopulation = population[0];
    let finalPopulation = null; // this is the predicted final population value
    let carryingCapacity = parameters.K;
    let growthRate = parameters.r;
    let timeFormat = "none"; 
    let actualValues = population; // Use the actual population values for EM comparison

        const logisticGrowth = new LogisticGrowthModel(
        initialPopulation, 
        finalPopulation,
        carryingCapacity,
        growthRate,
        null,
        null, 
        time, 
        timeFormat);
    const Results = logisticGrowth.LogisticSolver();

    console.log("Logistic Results:", Results);

    return res.status(200).json({
        message: "Processing successful",
        parameters: parameters,
           table: {
          headers: ["Time", "Population"], // prints the headers for the table
          rows: Results.results.map(([time, population]) => ({ // maps the results to an array of objects with time and population properties
            time,
            population
          }))
        }, 
        graph: {
          rows: Results.graphResults.map(([time, population]) => ({ // maps the graph results to an array of objects with time and population properties
            time,
            population
          }))
        }
    });
}

export const predPreyProcessCSV = async (req, res) => {};