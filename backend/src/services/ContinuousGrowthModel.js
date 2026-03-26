// Calculate the continuous growth model for a given set of parameters
export default class ContinuousGrowthModel {
    constructor(initialPopulation, growthRate, time, finalPopulation) { // Note: finalPopulation is not needed as it can be calculated using the formula
        this.initialPopulation = initialPopulation; // P0
        this.growthRate = growthRate; // r
        this.time = Array.isArray(time) ? time : [time]; // t, can be an array for multiple time points or a single value
        this.finalPopulation = finalPopulation; // P(t)
    }

    ContinuousFunctions() {
        const results = []; // To store results for each time point
        const tim = Array.isArray(this.time) ? this.time[0] : this.time; // Get the first time value if it's an array, otherwise use the single time value

        const nullCount = [this.initialPopulation, this.finalPopulation, this.growthRate, this.time].filter(v => v === null).length;
        if (nullCount > 1) { // Check if more than one parameter is null, which would make it impossible to solve
            throw new Error("Please provide exactly 2 values to solve for the missing one."); //  In continuous growth, we can only solve for one missing parameter at a time
        }

        if (this.growthRate === null) { // If growth rate is missing, calculate it using the formula rearranged: r = (ln(P(t)/P0)) / t
            let r = (Math.log(this.finalPopulation / this.initialPopulation)) / tim;
            results.push([tim, Number(r.toFixed(4))]);  
        } 
        else if (this.initialPopulation === null) { // If initial population is missing, calculate it using the formula rearranged: P0 = P(t) / e^(rt)
            let initial = this.finalPopulation / Math.pow(Math.exp(1), (this.growthRate * tim));
            results.push([tim, Number(initial.toFixed(2))]);
        }
        else if (this.time === null) { // If time is missing, calculate it using the formula rearranged: t = (ln(P(t)/P0)) / r
            let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / this.growthRate;
            results.push([Number(calculatedtime.toFixed(2)), this.finalPopulation]);
        } 
        else { // If all parameters are provided, calculate the final population using the original formula
            let population = this.initialPopulation * Math.pow(Math.exp(1), (this.growthRate * tim));
            results.push([tim, Number(population.toFixed(2))]);
        }
        return results; // Return the results array containing the calculated values for each time point
    }

    ContinuousSolver() {
        return this.ContinuousFunctions();
    }
}