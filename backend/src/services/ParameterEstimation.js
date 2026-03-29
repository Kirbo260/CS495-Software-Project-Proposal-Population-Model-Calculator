// Parameter Estimation Service
// This service is responsible for estimating the parameters of the population growth models based on the input data and the selected model type.
import ErrorMetrics from "../utils.js/ErrorMetrics.js";
import LogisticGrowthModel from "./LogisticGrowthModel.js";
import DiscreteGrowthModel from "./DiscreteGrowthModel.js";

export default class ParameterEstimation {
    constructor(predicted, actual) {
        this.predicted = predicted;
        this.actual = actual;
    }

    EstimateParameters() {
        const errorMetrics = new ErrorMetrics(this.predicted, this.actual);
        return errorMetrics.ErrorMetricsSolver();
}
}
