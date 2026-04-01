// Calculation for discrete growth model
import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

export default class DiscreteGrowthModel {
    constructor(initialPopulation, finalPopulation, growthRate, birthRate,
                deathRate, model, time, timeFormat) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.growthRate = new GrowthRate(birthRate, deathRate, growthRate).GrowthRateSolver(); // Calculate growth rate using the GrowthRate utility
        this.time = new TimeChecker(time, timeFormat).TimeCheck(); // use timeChecker to validate and convert it
        if (this.time != null) {
        this.maxTime = new TimeChecker(time).MaxTime(); // Get the maximum time value for plotting the graph
        }
        this.model = model; // "growth" or "decay" to determine which formula to use in the calculations
    }

    DiscreteFunctions() {
        const results = [];
        let denseTime = []; // To store dense time points for plotting a smooth curve if time is an array
        const graphResults = []; // To store results for dense time points for plotting

        /*const nullCount = [this.initialPopulation, this.finalPopulation, this.growthRate, this.time].filter(v => v === null).length;
        if (nullCount > 1) {
            throw new Error("Please provide exactly 3 values to solve for the missing one.");
        }*/
        if (this.finalPopulation === null) {
            for (let i = 0; i <= this.maxTime; i++){
                denseTime.push(i);
            }
            if (this.model === "growth") {
                denseTime.forEach(t => {
                    let graphPopulation = this.initialPopulation * Math.pow((1 + this.growthRate), t);
                    graphResults.push([t, Number(graphPopulation.toFixed(2))]); // rounded to 2 d.p for graph results
                    console.log(`Graph population at time ${t}: ${graphPopulation}`);
                });
                this.time.forEach(t => {
                    let population = this.initialPopulation * Math.pow((1 + this.growthRate), t);
                    results.push([t, Number(population.toFixed(2))]); // rounded to 2 d.p
                    console.log(`Population at time ${t}: ${population}`);
                });
            } 
            else if (this.model === "decay") {
                denseTime.forEach(t => {
                    let graphPopulation = this.initialPopulation * Math.pow((1 - this.growthRate), t);
                    graphResults.push([t, Number(graphPopulation.toFixed(2))]); // rounded to 2 d.p for graph results
                });
                this.time.forEach(t => {
                    let population = this.initialPopulation * Math.pow((1 - this.growthRate), t);
                    results.push([t, Number(population.toFixed(2))]); // rounded to 2 d.p
                });
            }
        } else if (this.growthRate === null) {
            if (this.model === "growth") {
            let r = (Math.pow((this.finalPopulation / this.initialPopulation), (1 / this.time[0])) - 1);
                  results.push([this.time[0], Number(r.toFixed(4))]); // rounded to 4 d.p for growth rate
            } else if (this.model === "decay") {
            let r = (1 - Math.pow((this.finalPopulation / this.initialPopulation), (1 / this.time[0])));
                results.push([this.time[0], Number(r.toFixed(4))]);
            }
            
        } else if (this.initialPopulation === null) {
            if (this.model === "growth") {
                let initial = this.finalPopulation / Math.pow((1 + this.growthRate), this.time[0]);
                results.push([this.time[0], Number(initial.toFixed(2))]); // rounded to 2 d.p for initial population
            } else if (this.model === "decay") {
                let initial = this.finalPopulation / Math.pow((1 - this.growthRate), this.time[0]);
                results.push([this.time[0], Number(initial.toFixed(2))]); // rounded to 2 d.p for initial population
            }
        } else if (this.time === null) {
            if (this.model === "growth") {
                let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / Math.log(1 + this.growthRate);
                results.push([Number(calculatedtime.toFixed(2)), this.finalPopulation]); // rounded to 2 d.p for calculated time
            } else if (this.model === "decay") {
                let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / Math.log(1 - this.growthRate);
                results.push([Number(calculatedtime.toFixed(2)), this.finalPopulation]); // rounded to 2 d.p for calculated time
            }
        }
        return {results, graphResults}; // return both the results array and graphResults array
    }

    DiscreteSolver() {
        return this.DiscreteFunctions();
    }
}