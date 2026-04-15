import csvValidator from "../../src/utils.js/csvValdator.js";

describe("csvValidator", () => {
    test("should check if the modelType is valid", async () => {
        const parsedData = [
            { time: "1", population: "100" },
            { time: "2", population: "150" }
        ];
        await expect(() => csvValidator(parsedData, "InvalidModelType")).rejects.toThrow("Invalid model type: InvalidModelType. Valid model types are Regular, Predator-prey");
    });

    test("should check for empty values in the data", async () => {
        const parsedData = [
            { time: "1", population: "100" },
            { time: "", population: "150" }
        ];
        await expect(() => csvValidator(parsedData, "Regular")).rejects.toThrow("Empty value found at row 2, column time");
    });

    test("should check for non-numeric values in the data for Regular model", async () => {
        const parsedData = [
            { time: "1", population: "100" },
            { time: "2", population: "abc" }
        ];
        await expect(() => csvValidator(parsedData, "Regular")).rejects.toThrow("Invalid data at row 2: time and population must be numbers");
    }
    );

    test("should check for non-numeric values in the data for Predator-prey model", async () => {
        const parsedData = [
            { time: "1", prey_population: "100", predator_population: "50" },
            { time: "2", prey_population: "150", predator_population: "abc" }
        ];
        await expect(() => csvValidator(parsedData, "Predator-prey"))
        .rejects.toThrow("Invalid data at row 2: time, prey_population, and predator_population must be numbers");
    });

    test("should return true for valid data", async () => {
        const parsedData = [
            { time: "1", population: "100" },
            { time: "2", population: "150" }
        ];
        await expect(csvValidator(parsedData, "Regular")).resolves.toBe(true);
    });

    test("should return true for valid data for Predator-prey model", async () => {
        const parsedData = [
            { time: "1", prey_population: "100", predator_population: "50" },
            { time: "2", prey_population: "150", predator_population: "75" }
        ];
        await expect(csvValidator(parsedData, "Predator-prey")).resolves.toBe(true);
    });
});