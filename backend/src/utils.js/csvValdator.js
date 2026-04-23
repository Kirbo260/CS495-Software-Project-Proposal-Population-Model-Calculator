// Validates the csv file numbers, just numbers

export default async function validateCSVData(parsedData, validType) {
    let data = parsedData;
    // Check if the required columns are present
    const validTypes = ["Regular", "Predator-prey"];

    if (!validTypes.includes(validType)) {
        throw new Error(`Invalid model type: ${modelType}. Valid model types are ${validTypes.join(", ")}`);
    }

    data.forEach((row, index) => {
          // check if any rows of numebers are empty or null or undefined
        Object.keys(row).forEach((key) => {
            if (row[key] === "" || row[key] === null || row[key] === undefined) {
                throw new Error(`Empty value found at row ${index + 1}, column ${key}`);
            }
        });
  
        // check if any rows of numbers are not valid numbers
    if (validType === validTypes[0]) { // Regular model
            if (Number.isNaN(Number(row.time)) 
                || Number.isNaN(Number(row.population))) {
                throw new Error(`Invalid data at row ${index + 1}: time and population must be numbers`);
            }

    } else if (validType === validTypes[1]) { // Predator-prey model
            if (Number.isNaN(Number(row.time)) 
                || Number.isNaN(Number(row.prey_population))
                || Number.isNaN(Number(row.predator_population))) {
                throw new Error(`Invalid data at row ${index + 1}: time, prey_population, and predator_population must be numbers`);
            }
    }
      });


   return true; // If all validations pass, return true (or you could return the validated data if needed)
}
