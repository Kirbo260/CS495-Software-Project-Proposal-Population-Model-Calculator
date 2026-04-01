import LogisticGrowthModel from "../../src/services/LogisticGrowthModel.js";

describe('LogisticGrowthModel', () => {

    // Solve for carrying capacity (K)
    test('calculates carrying capacity', () => {
        const model = new LogisticGrowthModel(
            100, 750, null, 0.1, null, null, 2, "y"
        );

        const { results } = model.LogisticSolver();

        expect(results[0][1]).toBeGreaterThan(0);
    });

    // Solve for growth rate (r)
    test('calculates growth rate', () => {
        const model = new LogisticGrowthModel(
            100, 450, 800, null, null, null, 2, "y"
        );

        const { results } = model.LogisticSolver();

        expect(results[0][1]).toBeGreaterThan(0);
    });

    // Solve for initial population (P0)
    test('calculates initial population', () => {
        const model = new LogisticGrowthModel(
            null, 150, 500, 0.1, null, null, 2, "y"
        );

        const { results } = model.LogisticSolver();

        expect(results[0][1]).toBeGreaterThan(0);
    });

    // Solve for time (t)
    test('calculates time', () => {
        const model = new LogisticGrowthModel(
            100, 150, 500, 0.1, null, null, null, "y"
        );

        const { results } = model.LogisticSolver();

        expect(results[0][0]).toBeGreaterThan(0);
    });

    // Solve for final population (Pt)
    test('calculates final population over time', () => {
        const model = new LogisticGrowthModel(
            100, null, 500, 0.1, null, null, [2], "y"
        );

        const { results } = model.LogisticSolver();

        expect(results[0][1]).toBeGreaterThan(0);
    });

    // Graph results generation
    test('generates graph results', () => {
        const model = new LogisticGrowthModel(
            100, null, 500, 0.1, null, null, [0,1,2], "y"
        );

        const { graphResults } = model.LogisticSolver();

        expect(graphResults.length).toBeGreaterThan(0);
        expect(graphResults[0][0]).toBe(0);
    });

});