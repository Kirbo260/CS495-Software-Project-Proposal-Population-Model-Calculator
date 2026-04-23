// Parameter Estimation Service
// This service is responsible for estimating the parameters of the population growth models based on the input data and the selected model type.
import ContinuousEstimate from  "../utils.js/ContinuousEstimate.js";
import DiscreteEstimate from "../utils.js/DiscreteEstimate.js";
import LogisticEstimate from "../utils.js/LogisticEstimate.js";

export default class ParameterEstimation {
    constructor(time, population, modelType) {
        this.time = time;
        this.population = population;
        this.modelType = modelType; // For now, we are only implementing parameter estimation for the continuous growth model. We can extend this to other models later.
    }

    estimateParameters() {
        const growthRate = 0;

        if (this.modelType === "continuous") {
            growthRate = new ContinuousEstimate(this.time, this.population).estimateContinuousGrowthRate();
            return { growthRate }; // return an object for easier coding
        }

        if (this.modelType === "discrete"){
            growthRate = new DiscreteEstimate(this.time,this.population).estimateDiscreteGrowthRate();
            return {growthRate};
        }

         if (this.modelType === "logistic"){
            const values = new LogisticEstimate(this.time,this.population).estimateLogisticGrowthRate();
            return values;
        }

        // Add parameter estimation logic for other model types (Discrete, Logistic) here
        throw new Error(`Parameter estimation for model type ${this.modelType} is not implemented yet.`);
    }

}