// Test for Predator Prey Models
import PredatorPrey from "../../src/services/PredatorPrey.js";

describe('PredatorPrey Model', () => {

    // Basic simulation runs
    test('runs simulation and returns arrays', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 5, 1,
            50, 10
        );

        const result = model.LoktaVolterraSolver();

        expect(result).toHaveProperty('time');
        expect(result).toHaveProperty('prey');
        expect(result).toHaveProperty('predator');
    });

    // Arrays grow correctly
    test('time, prey, predator arrays have same length', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 5, 1,
            50, 10
        );

        const { time, prey, predator } = model.LoktaVolterraSolver();

        expect(time.length).toBe(prey.length);
        expect(prey.length).toBe(predator.length);
    });

    // Initial values are correct
    test('initial populations are preserved', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 5, 1,
            50, 10
        );

        const { prey, predator } = model.LoktaVolterraSolver();

        expect(prey[0]).toBe(50);
        expect(predator[0]).toBe(10);
    });

    // Values change over time
    test('populations change over time', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 5, 1,
            50, 10
        );

        const { prey, predator } = model.LoktaVolterraSolver();

        expect(prey[1]).not.toBe(prey[0]);
        expect(predator[1]).not.toBe(predator[0]);
    });

    // Handles small time step
    test('works with smaller time step', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 2, 0.5,
            50, 10
        );

        const { time } = model.LoktaVolterraSolver();

        expect(time.length).toBeGreaterThan(3);
    });

    // No NaN values
    test('does not produce NaN values', () => {
        const model = new PredatorPrey(
            0.1, 0.02, 0.01, 0.1,
            0, 5, 1,
            50, 10
        );

        const { prey, predator } = model.LoktaVolterraSolver();

        prey.forEach(val => {
            expect(Number(val)).not.toBeNaN();
        });

        predator.forEach(val => {
            expect(Number(val)).not.toBeNaN();
        });
    });

});