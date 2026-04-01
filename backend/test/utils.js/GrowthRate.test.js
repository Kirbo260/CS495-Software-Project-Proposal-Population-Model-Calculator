// Test for growth rate utility function
import { calculateGrowthRate } from '../../src/utils/GrowthRate.js';
describe('Growth Rate', () => {
    test('calculates growth rate correctly', () => {
        const birthRate = 0.3;
        const deathRate = 0.1;
        const growthRate = null;
        const growth = calculateGrowthRate(birthRate, deathRate);
        expect(growth).toBe(0.2);
    });

    test('returns zero when birth rate equals death rate', () => {        
        const birthRate = 0.2;
        const deathRate = 0.2;
        const growthRate = null;
        const growth = calculateGrowthRate(birthRate, deathRate, growthRate);
        expect(growth).toBe(0);
    });

    test('returns growthrate if not null', () => {
        const birthRate = 0.3;
        const deathRate = 0.1;
        const growthRate = 0.5;
        const growth = calculateGrowthRate(birthRate, deathRate, growthRate);
        expect(growth).toBe(0.5);
    });

    test('fails if all parameters are null', () => {
        const birthRate = null;
        const deathRate = null;
        const growthRate = null;
        expect(() => calculateGrowthRate(birthRate, deathRate, growthRate)).toThrow(new Error("Please provide either the growth rate or both birth and death rates to calculate the growth rate."));
    });
});

