// Test for capital Population Growth Rate
import PopulationGrowthRate from '../src/services/PopulationGrowthRate';

describe('Population Growth Rate', () => {
    test('calculates capital growth rate', () => { 
        const growthRate = new PopulationGrowthRate(1000, 1100);
        const result = growthRate.capitalGrowthRate();
        expect(result).toBe(0.1);
    });
});

describe('Population Growth Rate', () => {
    test('calculates percentage growth rate', () => { 
        const growthRate = new PopulationGrowthRate(1000, 1100);  
        const result = growthRate.percentageGrowthRate();
        expect(result).toBe(10);
    });
});

describe('Population Growth Rate', () => {
    test('throws error for non-positive initial population', () => { 
        const growthRate = new PopulationGrowthRate(0, 1100);
        expect(() => growthRate.percentageGrowthRate()).toThrow("Initial population must be greater than zero.");
    });
});