// Test for growth rate utility function
import GrowthRate from '../../src/utils.js/GrowthRate.js';
describe('Growth Rate', () => {
    test('calculates growth rate correctly', () => {
        const birthRate = 0.3;
        const deathRate = 0.1;
        const growthRate = null;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0.2);
    });

    test('returns zero when birth rate equals death rate', () => {        
        const birthRate = 0.2;
        const deathRate = 0.2;
        const growthRate = null;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0);
    });

    test('returns growthrate if not null', () => {
        const birthRate = 0.3;
        const deathRate = 0.1;
        const growthRate = 0.5;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0.5);
    });

    test('returns null if all parameters are null', () => {
        const birthRate = null;
        const deathRate = null;
        const growthRate = null;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBeNull();
    });

    test('fails if only one of birth or death rate is provided', () => {
        const birthRate = 0.3;
        const deathRate = null;
        const growthRate = null;
        expect(() => new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver()).toThrow
        (new Error("Please provide either the growth rate or both birth and death" + 
                    " rates to calculate the growth rate."));
    });

    test('if only birth rate is null return growth rate', () => {
        const birthRate = null;
        const deathRate = 0.1;
        const growthRate = 0.5;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0.5);
    });

    test('if only death rate is null return growth rate', () => {
        const birthRate = 0.3;
        const deathRate = null;
        const growthRate = 0.5;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0.5);
    });

    test('if growth rate is null but birth and death rates are provided, calculate growth rate', () => {
        const birthRate = 0.3;
        const deathRate = 0.1;
        const growthRate = null;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(0.2);
    });

    test('if growth rate is null but birth and death rates are provided, calculate growth rate with negative growth', () => {
        const birthRate = 0.1;
        const deathRate = 0.3;
        const growthRate = null;
        const growth = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver();
        expect(growth).toBe(-0.2);
    });
});

