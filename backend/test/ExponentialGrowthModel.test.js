// Test for ExponentialGrowthModel
import ExponentialGrowthModel from '../src/services/ExponentialGrowthModel';

describe('ExponentialGrowthModel', () => {
    test('calculates population with missing growth rate', () => {
        const model = ExponentialGrowthModel.fromMissingRate(1000, [0, 1, 2], 5, 2);
        const result = model.calculatePopulation();
        expect(result).toEqual([
            [0, 1000],
            [1, 1003.0045045033771],
            [2, 1006.018036054065]
        ]);
    });

    test('calculates population with provided growth rate', () => {
        const model = ExponentialGrowthModel.NotMissingRate(1000, 0.05, [0, 1, 2], 50, 20);
        const result = model.calculatePopulation();
        expect(result).toEqual([
            [0, 1000],
            [1, 1051.2710963760241],
            [2, 1105.1709180756477]
        ]);
    });
});