// Parameter Estimation Service
// This service is responsible for estimating the parameters of the population growth models based on the input data and the selected model type.
import ContinuousEstimate from  "../utils.js/ContinuousEstimate.js";

export default class ParameterEstimation {
    constructor(time, population, modelType) {
        this.time = time;
        this.population = population;
        this.modelType = modelType; // For now, we are only implementing parameter estimation for the continuous growth model. We can extend this to other models later.
    }

    estimateParameters() {
        if (this.modelType === "continuous") {
            const growthRate = new ContinuousEstimate(this.time, this.population).estimateContinuousGrowthRate();
            return { growthRate };
        }

        // Add parameter estimation logic for other model types (Discrete, Logistic) here
        throw new Error(`Parameter estimation for model type ${this.modelType} is not implemented yet.`);
    }

}