import e from "express";

// Calculating logistic growth model using the formula P(t) = K / (1 + ((K - P0) / P0) * e^(-rt))
export default class LogisticGrowthModel {
    constructor(initialPopulation, growthRate, carryingCapacity, time, finalPopulation) {
        this.initialPopulation = initialPopulation;
        this.growthRate = growthRate;
        this.carryingCapacity = carryingCapacity;
        this.time = Array.isArray(time) ? time : [time]; // time can be an array for multiple time points or a single value
        this.finalPopulation = finalPopulation;
    }

    LogisticGrowthFunctions() {
        const results = []; // to store the results in the format [[time, population], ...]
        const P0 = this.initialPopulation; // initial population can be null if we are solving for it
        const Pt = this.finalPopulation; // final population can be null if we are solving for it
        const r = this.growthRate; // growth rate can be null if we are solving for it
        const K = this.carryingCapacity; // carrying capacity can be null if we are solving for it
        const tim = Array.isArray(this.time) ? this.time[0] : this.time; // time can be an array or a single value

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
            tim = -Math.log((K - P0) / K) / r;
            return tim;
        }else if (Pt === null) { // if all parameters are provided except for final population, calculate population at each time point
        // if all parameters are provided except for final population, calculate population at each time point
        this.time.forEach(t => {
            let population = K / (1 + ((K - P0) / P0) * expterm);
            results.push([t, Math.round(population * 100) / 100]); // round to 2 decimals}
        });}
        return results;
    }


    LogisticSolver() {
        return this.LogisticGrowthFunctions();
    }
}
