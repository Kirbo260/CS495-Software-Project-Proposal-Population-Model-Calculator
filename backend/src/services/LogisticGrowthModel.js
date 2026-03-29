import e from "express";
import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

// Calculating logistic growth model using the formula P(t) = K / (1 + ((K - P0) / P0) * e^(-rt))
export default class LogisticGrowthModel {
    constructor(initialPopulation, growthRate, carryingCapacity, time, finalPopulation) {
        this.initialPopulation = initialPopulation;
        this.growthRate = growthRate;
        this.carryingCapacity = carryingCapacity;
        this.time = new TimeChecker(time).TimeCheck(); // time can be an array for multiple time points or a single value
        this.finalPopulation = finalPopulation;
    }

    LogisticGrowthFunctions() {
        const results = []; // to store the results in the format [[time, population], ...]
        let P0 = this.initialPopulation; // initial population can be null if we are solving for it
        let Pt = this.finalPopulation; // final population can be null if we are solving for it
        let r = this.growthRate; // growth rate can be null if we are solving for it
        let K = this.carryingCapacity; // carrying capacity can be null if we are solving for it
        let tim = this.time; // time can be null if we are solving for it, or an array

        const nullCount = [P0, r, K, tim, Pt].filter(v => v === null).length;
        if (nullCount > 1) {
            throw new Error("Please provide exactly 4 values to solve for the missing one.");
        }

        const expterm = Math.exp(-r * tim); // calculate e^(-rt) once to avoid redundant calculations

        if (K === null) { // solving for carrying capacity
            K = (Pt * P0 * (1 - expterm)) / (P0 - Pt * expterm);
            return K;
        }
        else if (r === null) { // solving for growth rate
            r = -Math.log((K - Pt) / (K - P0)) / tim;
            return r;
        }
        else if (P0 === null) { // solving for initial population
            P0 = K / (1 + ((K - Pt) / Pt) * expterm); // simplified to P0 = K / (1 + 0) = K
            return P0;
        }
        else if (tim === null) { // solving for time
            let timt = -Math.log((K - Pt) / (K - P0)) / r;
            results.push([Number(timt.toFixed(2)), Pt]); // round time to 2 decimals
            return results;
        } else if (Pt === null) { // if all parameters are provided except for final population, calculate population at each time point
            // if all parameters are provided except for final population, calculate population at each time point
                tim.forEach(t => {
                let population = K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
                results.push([t, Math.round(population * 100) / 100]); // round to 2 decimals}
            });
        }
        return results;
    }


    LogisticSolver() {
        return this.LogisticGrowthFunctions();
    }
}
