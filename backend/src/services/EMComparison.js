// Compares the different models using error metrics like RMSE and MAE
import ErrorMetrics from "../utils.js/ErrorMetrics.js";
import LogisticGrowthModel from "./LogisticGrowthModel.js";
import DiscreteGrowthModel from "./DiscreteGrowthModel.js";
import ContinuousGrowthModel from "./ContinuousGrowthModel.js";
import TimeChecker from "../utils.js/TimeChecker.js";

export default class EMComparison {
    constructor(initialPopulation, finalPopulation, growthRate, time, timeFormat,
        carryingCapacity, modelType, actualValues) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.growthRate = growthRate;
        this.time = time; // time can be an array for multiple time points or a single value
        this.timeFormat = timeFormat; // Format for the time values (e.g., "days", "weeks", "months")
        this.carryingCapacity = carryingCapacity;
        this.modelType = modelType;
        this.actual = actualValues;
    }

    ModelGrowthComparison() {
        let yi = this.actual;

        if (this.time === null) {
            this.time = [];
            for (let i = 0; i < yi.length; i++) {
                this.time.push(i); // if time is not provided, assume it is 0, 1, 2, ... for each data point
            }
        }
        const conpredicted = new ContinuousGrowthModel(this.initialPopulation, this.finalPopulation, this.growthRate,
            null, null, this.time, this.timeFormat).ContinuousSolver();
        //  const discpredicted = new DiscreteGrowthModel(this.initialPopulation, this.finalPopulation, this.growthRate, this.time, this.modelType).DiscreteFunctions();
        //  const logipredicted = new LogisticGrowthModel(this.initialPopulation, this.growthRate, this.carryingCapacity, this.time, this.finalPopulation).LogisticSolver();

        // to see if it works, log the predicted values for the continuous growth model
        // console.log("Predicted values for Continuous Growth Model:", conpredicted.results.map(p => p[1]));

        if (conpredicted.results.length !== this.actual.length) {
            throw new Error("Predicted and actual values must have the same length.");
        }
        

        // RMSEE and MAE for all growth models
        const { rmse: conRMSE, mae: conMAE } = new ErrorMetrics(conpredicted.results.map(p => p[1]), this.actual).ErrorMetricsSolver();
        // const { discRMSE, discMAE } = new ErrorMetrics(discpredicted.results.map(p => p[1]), this.actual).ErrorMetricsSolver();
        // const { logiRMSE, logiMAE } = new ErrorMetrics(logipredicted.results.map(p => p[1]), this.actual).ErrorMetricsSolver();

       // console.log("Continuous Growth Model - RMSE:", conRMSE, "MAE:", conMAE);

        // Store RMSE results for each model in an array of objects for easy comparison
        const RMSEcomparisonResults = [
            { conrmse: conRMSE, name: "Continuous" },
            //   { rmse: discRMSE, name: "Discrete" },
            //   { rmse: logiRMSE, name: "Logistic" }
        ];

        // Store MAE results for each model in an array of objects for easy comparison
        const MAEcomparisonResults = [
            { conmae: conMAE, name: "Continuous" },
            // { mae: discMAE, name: "Discrete" },
            //  { mae: logiMAE, name: "Logistic" }
        ];

        RMSEcomparisonResults.sort((a, b) => a.conrmse - b.conrmse); // Sort by RMSE in ascending order
        MAEcomparisonResults.sort((a, b) => a.conmae - b.conmae); // Sort by MAE in ascending order
        // console.log("RMSE Comparison Results:", RMSEcomparisonResults);
        // console.log("MAE Comparison Results:", MAEcomparisonResults);


        return {
            rmse: RMSEcomparisonResults[0].conrmse,
            mae: MAEcomparisonResults[0].conmae
        };
    }
}
