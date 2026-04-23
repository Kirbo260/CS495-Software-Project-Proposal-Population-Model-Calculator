// Csv controller for handling CSV file uploads and processing for population models
import ParameterEstimation from "../services/ParameterEstimation.js";
import EMComparison from "../services/EMComparison.js";

export const processCSV = async (req, res) => {
    console.log(" CONTROLLER HIT");
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    const modelType = req.params.modelType;
    const time = data.map(d => d.time) || null;
    const population = data.map(d => d.population);
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

    if (modelTypeForPM == "continuous"){

    }else if (modelTypeForPM == "discrete"){

    }else if (modelTypeForPM == "logistic"){

    }else if(modelTypeForPM == "predator-prey"){

    }else if(modelTypeForPM == "continuous"){

    }
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
};