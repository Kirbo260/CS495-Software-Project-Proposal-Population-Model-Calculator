import LogisticGrowthModel from "../../src/services/LogisticGrowthModel";

describe('LogisticGrowthModel', () => {
    test('calculates population with provided values', () => {
        const model = new LogisticGrowthModel(1000, 0.05, 5000);
        const result = model.populationAtTime([0, 1, 2]);
        expect(result).toEqual([
            [0, 1000],
            [1, 1040.6],
            [2, 1082.4]
        ]);
    });

    test('throws error for non-array time input', () => {
        const model = new LogisticGrowthModel(1000, 0.05, 5000);
        expect(() => model.populationAtTime("not an array")).toThrow("Time must be an array");
    });
}); 
 