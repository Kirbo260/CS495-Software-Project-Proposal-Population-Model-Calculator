// Calculate RMSE and MAE for a given set of predicted and actual values

export default class ErrorMetrics {
    constructor(predicted, actual) {
        this.predicted = predicted;
        this.actual = actual;
    }

    calculateRMSE() { // Root Mean Squared Error
        let sum = 0;
        const y = this.predicted; // predicted values 
        const yi = this.actual; // actual values

        if (y.length !== yi.length) {
            throw new Error("Predicted and actual arrays must have the same length");
        }

        const n = y.length; // number of data points
        for (let i = 0; i < n; i++) {
            sum += Math.pow(y[i] - yi[i], 2); // squared error for each data point
        }
        const rmse = Math.sqrt(sum / n); // mean squared error and then take the square root
        return rmse;
    }

    calculateMAE() { // Mean Absolute Error
        const y = this.predicted; // predicted values
        const yi = this.actual; // actual values
        const n = y.length; // number of data points
        let sum = 0;

        for (let i = 0; i < n; i++) {
            sum += Math.abs(yi[i] - y[i]); // absolute error for each data point
        }
        const mae = sum / n; // mean absolute error
        return mae;
    }


    ErrorMetricsSolver() {
        return {
            rmse: this.calculateRMSE(),
            mae: this.calculateMAE()
        };
    }
}
