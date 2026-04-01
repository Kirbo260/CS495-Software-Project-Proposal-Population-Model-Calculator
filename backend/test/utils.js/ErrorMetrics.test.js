// Test for error metrics model
import { calculateErrorMetrics } from '../../src/utils/errorMetrics.js';
describe('Error Metrics', () => {
    test('calculates RMSE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [1, 2, 5];
        const metrics = calculateErrorMetrics(actual, predicted);
        expect(metrics.rmse).toBe(Math.sqrt(2.6666666666666665));
    });

    test('calculates MAE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [1, 2, 5];
        const metrics = calculateErrorMetrics(actual, predicted);
        expect(metrics.mae).toBe(0.6666666666666666);
    });
});