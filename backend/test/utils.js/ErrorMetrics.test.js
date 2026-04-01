// Test for error metrics model
import ErrorMetrics from '../../src/utils.js/ErrorMetrics.js';
describe('Error Metrics', () => {
    test('calculates RMSE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [1, 2, 5];
        const metrics = new ErrorMetrics(actual, predicted).ErrorMetricsSolver();
        expect(metrics.rmse).toBe(Math.sqrt(1.3333333333333333));
    });

    test('calculates MAE correctly', () => {
        const actual = [1, 2, 3];
        const predicted = [1, 2, 5];
        const metrics = new ErrorMetrics(actual, predicted).ErrorMetricsSolver();
        expect(metrics.mae).toBe(0.6666666666666666);
    });

    test('throws error for mismatched array lengths', () => {
        const actual = [1, 2];
        const predicted = [1, 2, 3];
        expect(() => new ErrorMetrics(actual, predicted).ErrorMetricsSolver()).toThrow(new Error("Predicted and actual arrays must have the same length"));
    });
});