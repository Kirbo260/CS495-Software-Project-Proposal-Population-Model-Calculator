// Calculation for discrete growth model
import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

export default class DiscreteGrowthModel {
    constructor(initialPopulation, finalPopulation, growthRate, time, model) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.growthRate = growthRate;
        this.time = new TimeChecker(time).TimeCheck(); // time can be an array for multiple time points or a single value, use timeChecker to validate and convert it
        this.model = model;
    }

    DiscreteFunctions() {
        const results = [];

        const nullCount = [this.initialPopulation, this.finalPopulation, this.growthRate, this.time].filter(v => v === null).length;
        if (nullCount > 1) {
            throw new Error("Please provide exactly 3 values to solve for the missing one.");
        }

        if (this.finalPopulation === null) {
            // check if time is an array or a single value
            if (this.model === "growth") {
               this.time.forEach(t => {
                    let population = this.initialPopulation * Math.pow((1 + this.growthRate), t);
                    results.push([t, Number(population.toFixed(2))]); // rounded to 2 d.p
                });
                return results;
            } else if (this.model === "decay") {
                this.time.forEach(t => {
                    let population = this.initialPopulation * Math.pow((1 - this.growthRate), t);
                    results.push([t, Number(population.toFixed(2))]); // rounded to 2 d.p
                });
                return results;
            }

        } else if (this.growthRate === null) {
            if (this.model === "growth") {
            let r = (Math.pow((this.finalPopulation / this.initialPopulation), (1 / this.time[0])) - 1);
                  results.push([this.time[0], Number(r.toFixed(4))]); // rounded to 4 d.p for growth rate
                return results;
            } else if (this.model === "decay") {
            let r = (1 - Math.pow((this.finalPopulation / this.initialPopulation), (1 / this.time[0])));
                results.push([this.time[0], Number(r.toFixed(4))]);
                return results;
            }
            
        } else if (this.initialPopulation === null) {
            if (this.model === "growth") {
                let initial = this.finalPopulation / Math.pow((1 + this.growthRate), this.time[0]);
                results.push([this.time[0], Number(initial.toFixed(2))]); // rounded to 2 d.p for initial population
                return results;
            } else if (this.model === "decay") {
                let initial = this.finalPopulation / Math.pow((1 - this.growthRate), this.time[0]);
                results.push([this.time[0], Number(initial.toFixed(2))]); // rounded to 2 d.p for initial population
                return results;
            }
        } else if (this.time === null) {
            if (this.model === "growth") {
                let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / Math.log(1 + this.growthRate);
                results.push([Number(calculatedtime.toFixed(2)), this.finalPopulation]); // rounded to 2 d.p for calculated time
                return results;
            } else if (this.model === "decay") {
                let calculatedtime = Math.log(this.finalPopulation / this.initialPopulation) / Math.log(1 - this.growthRate);
                results.push([ Number(calculatedtime.toFixed(2)), this.finalPopulation]); // rounded to 2 d.p for calculated time
                return results;
            }
        }
    }

    DiscreteSolver() {
        return this.DiscreteFunctions();
    }
}