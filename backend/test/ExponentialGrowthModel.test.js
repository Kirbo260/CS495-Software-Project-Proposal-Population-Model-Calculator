// Test for ExponentialGrowthModel
import ExponentialGrowthModel from '../src/services/ExponentialGrowthModel';

describe('ExponentialGrowthModel', () => {
    test('calculates population with missing growth rate', () => {
        const model = ExponentialGrowthModel.fromMissingRate(1000, [0, 1, 2], 5, 2);
        const result = model.calculatePopulation();
        expect(result).toEqual([
            [0, 1000],
            [1, 1003],
            [2, 1006.02]
        ]);
    });

    test('calculates population with provided growth rate', () => {
        const model = ExponentialGrowthModel.NotMissingRate(1000, 0.05, [0, 1, 2], 50, 20);
        const result = model.calculatePopulation();
        expect(result).toEqual([
            [0, 1000],
            [1, 1051.27],
            [2, 1105.17]
        ]);
    });
});