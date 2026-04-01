// Test for continuous growth model
import { ContinuousGrowthModel } from '../src/models/ContinuousGrowthModel.js';

describe('ContinuousGrowthModel', () => {
    test('calculates population correctly', () => {
        const model = new ContinuousGrowthModel(
            1000, // initialPopulation
            null, // finalPopulation (not needed for this test)
            0.05, // growthRate
            null, // birthRate (not needed for this test)
            null, // deathRate (not needed for this test)
            "growth", // modelType
            10, // time
            "years" // timeFormat
        );  
        const result = model.calculatePopulation();
        expect(result).toBeCloseTo(1648.72, 2);
    });
});

describe('Calculates for initial population', () => {
    test('calculates initial population correctly', () => {
        const model = new ContinuousGrowthModel(
            1000, // initialPopulation
            null, // finalPopulation (not needed for this test)
            0.05, // growthRate
            null, // birthRate (not needed for this test)
            null, // deathRate (not needed for this test)
            "growth", // modelType
            0, // time
            "years" // timeFormat
        );  
        const result = model.calculatePopulation();
        expect(result).toBeCloseTo(1000, 2);
    });
});

describe('Calculates for no growth rate', () => { 
    test('calculates population correctly with no growth rate', () => {
        const model = new ContinuousGrowthModel(
            1000, // initialPopulation  
            null, // finalPopulation (not needed for this test)
            0, // growthRate
            null, // birthRate (not needed for this test)
            null, // deathRate (not needed for this test)
            "growth", // modelType
            10, // time
            "years" // timeFormat
        );  
        const result = model.calculatePopulation();
        expect(result).toBeCloseTo(1000, 2);
    });
});

describe('Calculates no time', () => {
    test('calculates population correctly for different time', () => {
        const model = new ContinuousGrowthModel(
            1000, // initialPopulation
            null, // finalPopulation (not needed for this test)
            0.05, // growthRate
            null, // birthRate (not needed for this test)
            null, // deathRate (not needed for this test)
            "growth", // modelType
            null, // time
            "years" // timeFormat
        );  
        const result = model.calculatePopulation();
        expect(result).toBeCloseTo(1000, 2);
    });
});
