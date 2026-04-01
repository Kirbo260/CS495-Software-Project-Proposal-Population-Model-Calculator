// test for discrete growth model
import DiscreteGrowthModel from "../../src/services/DiscreteGrowthModel";

describe('DiscreteGrowthModel', () => {
    test('calculates final population for growth model', () => {
        const model = new DiscreteGrowthModel(1000, null, 0.05, [0, 1, 2], "growth");
        const result = model.DiscreteFunctions();
        expect(result).toEqual([
            [0, 1000],
            [1, 1050],
            [2, 1102.5]
        ]);
    });

    test('calculates growth rate for decay model', () => {
        const model = new DiscreteGrowthModel(1000, 800, null, 2, "decay");
        const result = model.DiscreteFunctions();
        expect(result).toEqual([
            [2, 0.1056]
        ]);
    });

    test('calculates initial population for growth model', () => {
        const model = new DiscreteGrowthModel(null, 1102.5, 0.05, 2, "growth");
        const result = model.DiscreteFunctions();
        expect(result).toEqual([
            [2, 1000]
        ]);
    });
});