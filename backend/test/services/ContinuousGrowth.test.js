import ContinuousGrowthModel from "../../src/services/ContinuousGrowthModel.js";

describe('ContinuousGrowthModel', () => {

    // Final population calculation
    test('calculates final population over time', () => {
        const model = new ContinuousGrowthModel(
            1000, null, 0.05, null, null, [2], "y"
        );

        const { results } = model.ContinuousSolver();

        // P(t) = 1000 * e^(0.05 * 2) ≈ 1105.17
        expect(results[0][1]).toBeCloseTo(1105.17, 2);
    });

    // Growth rate calculation
    test('calculates growth rate', () => {
        const model = new ContinuousGrowthModel(
            1000, 1105.17, null, null, null, [2], "y"
        );

        const { results } = model.ContinuousSolver();

        expect(results[0][1]).toBeCloseTo(0.05, 2);
    });

    // Initial population calculation
    test('calculates initial population', () => {
        const model = new ContinuousGrowthModel(
            null, 1105.17, 0.05, null, null, [2], "y"
        );

        const { results } = model.ContinuousSolver();

        expect(results[0][1]).toBeCloseTo(1000, 2);
    });

    // Time calculation
    test('calculates time', () => {
        const model = new ContinuousGrowthModel(
            1000, 1105.17, 0.05, null, null, null, "y"
        );

        const { results } = model.ContinuousSolver();

        expect(results[0][0]).toBeCloseTo(2, 1);
    });

    // Graph results generation
    test('generates graph results for continuous growth', () => {
        const model = new ContinuousGrowthModel(
            1000, null, 0.05, null, null, [0,1,2], "y"
        );

        const { graphResults } = model.ContinuousSolver();

        expect(graphResults.length).toBeGreaterThan(0);
        expect(graphResults[0]).toEqual([0, 1000]);
    });

});