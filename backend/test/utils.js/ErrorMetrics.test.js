// Test for error metrics model
import { calculateErrorMetrics } from '../../src/utils/errorMetrics.js';
describe('Error Metrics', () => {
    test('calculates MSE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [1, 2, 3];
        const metrics = calculateErrorMetrics(actual, predicted);
        expect(metrics.mse).toBeCloseTo(0, 5);
    });

    test('calculates MAE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [2, 3, 4];
        const metrics = calculateErrorMetrics(actual, predicted);
        expect(metrics.mae).toBeCloseTo(1, 5);
    });

    test('calculates RMSE correctly', () => {
        const actual = 