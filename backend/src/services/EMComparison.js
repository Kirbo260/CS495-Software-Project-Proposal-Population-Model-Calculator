// Compares the different models using error metrics like RMSE and MAE
import ErrorMetrics from "../utils.js/ErrorMetrics.js";
import LogisticGrowthModel from "./LogisticGrowthModel.js";
import DiscreteGrowthModel from "./DiscreteGrowthModel.js";
import ContinuousGrowthModel from "./ContinuousGrowthModel.js";

export default class EMComparison {
    constructor(initialPopulation, finalPopulation, growthRate, time,
        carryingCapacity, modelType, actualValues) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.growthRate = growthRate;
        this.time = time; // time can be an array for multiple time points or a single value
        this.carryingCapacity = carryingCapacity;
        this.modelType = modelType;
        this.actual = actualValues;
    }

    EMFunctions(modelFunctions) { // To generate predictions for the differnt models 
        let predictions = [];
        const P0 = this.initialPopulation;
        const Pt = this.finalPopulation;
        const r = this.growthRate;
        const t = this.time;
        const K = this.carryingCapacity;
        const mt = this.modelType;
        const yi = this.actual;

        for (let i = 0; i < yi.length; i++) {
            predictions.push(modelFunctions(P0, Pt, r, t, K, mt));
        }
        return predictions;
    }

    ModelGrowthComparison() {
        let yi = this.actual;

        if (this.time === null) {
            for (let i = 0; i < yi.length; i++) {
                this.time.push(i); // if time is not provided, assume it is 0, 1, 2, ... for each data point
            }

            const conpredicted = new ContinuousGrowthModel(this.initialPopulation, this.growthRate, this.time, this.finalPopulation).ContinuousSolver();
            const discpredicted = new DiscreteGrowthModel(this.initialPopulation, this.finalPopulation, this.growthRate, this.time, this.modelType).DiscreteFunctions();
            const logipredicted = new LogisticGrowthModel(this.initialPopulation, this.growthRate, this.carryingCapacity, this.time, this.finalPopulation).LogisticSolver();

            // RMSEE and MAE for all growth models
            const { conRMSE, conMAE } = new ErrorMetrics(conpredicted.map(p => p[1]), this.actual).ErrorMetricsSolver();
            const { discRMSE, discMAE } = new ErrorMetrics(discpredicted.map(p => p[1]), this.actual).ErrorMetricsSolver();
            const { logiRMSE, logiMAE } = new ErrorMetrics(logipredicted.map(p => p[1]), this.actual).ErrorMetricsSolver();

            // Store RMSE results for each model in an array of objects for easy comparison
            const RSMEcomparisonResults = [
                { rmse: conRMSE, name: "Continuous" },
                { rmse: discRMSE, name: "Discrete" },
                { rmse: logiRMSE, name: "Logistic" }
            ];

            // Store MAE results for each model in an array of objects for easy comparison
            const MAEcomparisonResults = [
                { mae: conMAE, name: "Continuous" },
                { mae: discMAE, name: "Discrete" },
                { mae: logiMAE, name: "Logistic" }
            ];

            RSMEcomparisonResults.sort((a, b) => a.rmse - b.rmse); // Sort by RMSE in ascending order
            MAEcomparisonResults.sort((a, b) => a.mae - b.mae); // Sort by MAE in ascending order

            return {
                rmse: RSMEcomparisonResults[0].name,
                mae: MAEcomparisonResults[0].name
            };
        }
    }
}