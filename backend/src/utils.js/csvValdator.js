// Validates the csv file and checks if it has the required columns for the population growth models
import { parseCSV } from "./ParsingFunction.js";

export default async function validateCSVData(csvFile, modelType) {
    const data = await parseCSV(csvFile);
    // Check if the required columns are present
    const requiredColumns = ["time", "population"];
    const validTypes = ["Regular", "Predator-prey"];
    const predatorPreyColumns = ["time", "prey_population", "predator_population"];

    if (!validTypes.includes(modelType)) {
        throw new Error(`Invalid model type: ${modelType}. Valid model types are ${validTypes.join(", ")}`);
    }

    if (!data || data.length === 0) {
        throw new Error("CSV file is empty");
    }

    if (modelType === validTypes[0]) {
        const missingColumns = requiredColumns.filter(col => !Object.prototype.hasOwnProperty.call(data[0], col));
        if (missingColumns.length > 0) {
            throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);
        }

        // Additional validation can be added here (e.g., check if time and population values are valid numbers)
        data.forEach((row, index) => {
            if (isNaN(row.time) || isNaN(row.population)) {
                throw new Error(`Invalid data at row ${index + 1}: time and population must be numbers`);
            }
        });
    } else if (modelType === validTypes[1]) {
        const missingPredatorPreyColumns = predatorPreyColumns.filter(col => !Object.prototype.hasOwnProperty.call(data[0], col));
        if (missingPredatorPreyColumns.length > 0) {
            throw new Error(`Missing required columns for Predator-Prey model: ${missingPredatorPreyColumns.join(", ")}`);
        }

        data.forEach((row, index) => {
            if (isNaN(row.time) || isNaN(row.prey_population) || isNaN(row.predator_population)) {
                throw new Error(`Invalid data at row ${index + 1}: time, prey_population, and predator_population must be numbers`);
            }
        });
    }

    return data; // Return the validated data for further processing
}
