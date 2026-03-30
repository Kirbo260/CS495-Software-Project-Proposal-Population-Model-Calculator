// Calculate the continuous growth model for a given set of parameters
import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

export default class ContinuousGrowthModel {
    constructor(initialPopulation, growthRate, time, finalPopulation) { // Note: finalPopulation is not needed as it can be calculated using the formula
        this.initialPopulation = initialPopulation; // P0
        this.growthRate = growthRate; // r
        this.time = new TimeChecker(time).TimeCheck(); // t, can be an array for multiple time points or a single value
        this.MaxTime = new TimeChecker(time).MaxTime(); // Get the maximum time value for plotting the graph
        this.finalPopulation = finalPopulation; // P(t)
    }

    ContinuousFunctions() {
        const results = []; // To store results for each time point
        let denseTime = []; // To store dense time points for plotting a smooth curve if time is an array
        const graphResults = []; // To store results for dense time points for plotting

        const nullCount = [this.initialPopulation, this.finalPopulation, this.growthRate, this.time].filter(v => v === null).length;
        if (nullCount > 1) { // Check if more than one parameter is null, which would make it impossible to solve
            throw new Error("Please provide exactly 2 values to solve for the missing one."); //  In continuous growth, we can only solve for one missing parameter at a time
        }

        if (this.growthRate === null) { // If growth rate is missing, calculate it using the formula rearranged: r = (ln(P(t)/P0)) / t
            let r = (Math.log(this.finalPopulation / this.initialPopulation)) / this.time[0];
            results.push([this.time[0], Number(r.toFixed(4))]);  
        } 
        else if (this.initialPopulation === null) { // If initial population is missing, calculate it using the formula rearranged: P0 = P(t) / e^(rt)
            let initial = this.finalPopulation / Math.pow(Math.exp(1), (this.growthRate * this.time[0]));
            results.push([this.time[0], Number(initial.toFixed(2))]);
        }
        else if (this.time === null) { // If time is missing, calculate it using the formula rearranged: t = (ln(P(t)/P0)) / r
            let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / this.growthRate;
            results.push([Number(calculatedtime.toFixed(2)), this.finalPopulation]);
        } 
        else if (this.finalPopulation == null){ // If all parameters are provided, calculate the final population using the original formula
            for (let i = 0; i <= this.MaxTime; i++){
            denseTime.push(i);
            }
            this.time.forEach(t => {
            let population = this.initialPopulation * Math.pow(Math.exp(1), (this.growthRate * t));
            results.push([t, Number(population.toFixed(2))]);
             });
            denseTime.forEach(t => {
            let graphPopulation = this.initialPopulation * Math.pow(Math.exp(1), (this.growthRate * t));
            graphResults.push([t, Number(graphPopulation.toFixed(2))]);
             });
        }
        return {results, graphResults}; // Return both the results array and graphResults array
    }

    ContinuousSolver() {
        return this.ContinuousFunctions();
    }
}