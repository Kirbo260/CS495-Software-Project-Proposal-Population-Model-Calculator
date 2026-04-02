import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

// Calculating logistic growth model using the formula P(t) = K / (1 + ((K - P0) / P0) * e^(-rt))
export default class LogisticGrowthModel {
    constructor(initialPopulation, finalPopulation, carryingCapacity,
        growthRate, birthRate, deathRate, time, timeFormat) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.carryingCapacity = carryingCapacity;
        this.growthRate = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver(); // Calculate growth rate using the GrowthRate utility
        this.time = new TimeChecker(time, timeFormat).TimeCheck(); // time can be an array for multiple time points or a single value
        if (time != null) {
            this.maxTime = new TimeChecker(time).MaxTime(); // Get the maximum time value for plotting the graph
        }
    }

    LogisticGrowthFunctions() {
        let P0 = this.initialPopulation;
        let Pt = this.finalPopulation;
        let K = this.carryingCapacity;
        let r = this.growthRate;
        let tim = this.time;

        const results = [];
        const graphResults = [];
        const denseTime = [];
        const expterm = Math.exp(-r * tim); // calculate e^(-rt) once to avoid redundant calculations

        const nullCount = [this.initialPopulation, this.finalPopulation, this.carryingCapacity, this.growthRate, this.time].filter(v => v === null).length;
        if (nullCount > 1) {
            throw new Error("Please provide exactly 3 values to solve for the missing one.");
        }

        if (K === null) { // solving for carrying capacity
            K = (Pt * P0 * (1 - expterm)) / (P0 - (Pt * expterm));
            console.log("Calculated carrying capacity K:", K);
            results.push([tim, Number(K.toFixed(2))]); // round carrying capacity to 2 decimals
        }
        else if (r === null) { // solving for growth rate
            r = -Math.log(((K - Pt) / Pt) / ((K - P0) / P0)) / tim;
            results.push([tim, Number(r.toFixed(4))]); // round growth rate to 4 decimals
        }
        else if (P0 === null) { // solving for initial population
            P0 = K / (1 + ((K - Pt) / Pt) * Math.exp(r * tim));
            results.push([tim, Number(P0.toFixed(2))]); // round initial population to 2 decimals
        }
        else if (tim === null) { // solving for time
            let timt = -Math.log(((K - Pt) / Pt) / ((K - P0) / P0)) / r;
            results.push([Number(timt.toFixed(2)), Pt]); // round time to 2 decimals
        }
        else if (Pt === null) { // if all parameters are provided except for final population, calculate population at each time point
            // if all parameters are provided except for final population, calculate population at each time point
            for (let i = 0; i <= this.maxTime; i++) {
                denseTime.push(i);
            }
            denseTime.forEach(t => {
                let graphPopulation = K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
                graphResults.push([t, Number(graphPopulation.toFixed(2))]); // round to 2 decimals for graph results
            });
            tim.forEach(t => {
                let population = K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
                results.push([t, Math.round(population * 100) / 100]); // round to 2 decimals
            });
        }
        return { results, graphResults }; // return both the results array and graphResults array
    }


    LogisticSolver() {
        return this.LogisticGrowthFunctions();
    }
}
