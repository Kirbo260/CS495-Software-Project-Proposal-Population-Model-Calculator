import DiscreteGrowthModel from "../../src/services/DiscreteGrowthModel.js";

describe('DiscreteGrowthModel', () => {

    //Final population (growth)
    test('calculates final population for growth model', () => {
        const model = new DiscreteGrowthModel(
            1000, null, 0.05, null, null, "growth", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(1102.5, 2);
    });

    // Final population (decay)
    test('calculates final population for decay model', () => {
        const model = new DiscreteGrowthModel(
            1000, null, 0.05, null, null, "decay", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(902.5, 2);
    });

    // Growth rate (growth)
    test('calculates growth rate', () => {
        const model = new DiscreteGrowthModel(
            1000, 1102.5, null, null, null, "growth", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(0.05, 2);
    });

    // Growth rate (decay)
    test('calculates decay rate', () => {
        const model = new DiscreteGrowthModel(
            1000, 902.5, null, null, null, "decay", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(0.05, 2);
    });

    // Initial population (growth)
    test('calculates initial population for growth', () => {
        const model = new DiscreteGrowthModel(
            null, 1102.5, 0.05, null, null, "growth", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(1000, 2);
    });

    // Initial population (decay)
    test('calculates initial population for decay', () => {
        const model = new DiscreteGrowthModel(
            null, 902.5, 0.05, null, null, "decay", [2], "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][1]).toBeCloseTo(1000, 2);
    });

    // Time calculation (growth)
    test('calculates time for growth', () => {
        const model = new DiscreteGrowthModel(
            1000, 1102.5, 0.05, null, null, "growth", null, "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][0]).toBeCloseTo(2, 1);
    });

    // Time calculation (decay)
    test('calculates time for decay', () => {
        const model = new DiscreteGrowthModel(
            1000, 902.5, 0.05, null, null, "decay", null, "y"
        );

        const { results } = model.DiscreteSolver();

        expect(results[0][0]).toBeCloseTo(2, 1);
    });

    // Graph results exist
    test('generates graph results', () => {
        const model = new DiscreteGrowthModel(
            1000, null, 0.05, null, null, "growth", [0,1,2], "y"
        );

        const { graphResults } = model.DiscreteSolver();

        expect(graphResults.length).toBeGreaterThan(0);
        expect(graphResults[0]).toEqual([0, 1000]);
    });

});