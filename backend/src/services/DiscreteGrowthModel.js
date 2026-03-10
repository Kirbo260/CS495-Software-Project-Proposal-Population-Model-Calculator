// Calculation for discrete growth model
export default class DiscreteGrowthModel {
    constructor(initialPopulation, finalPopulation, growthRate, time, model) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
        this.growthRate = growthRate;
        this.time = time;
        this.model = model;
    }

    DiscreteFunctions(initialPopulation, finalPopulation, growthRate, time) {
        if (finalPopulation === null) {
        const results = [];
            if (this.model === "growth") {
                for (let i = 0; i < this.time.length; i++) {
                    let population = initialPopulation * Math.pow((1 + growthRate), this.time[i]);
                    results.push([this.time[i], Number(population.toFixed(2))]); // rounded to 2 d.p
                }
                return results;
            } else if (this.model === "decay") {
                for (let i = 0; i < this.time.length; i++) {
                    let population = initialPopulation * Math.pow((1 - growthRate), this.time[i]);
                    results.push([this.time[i], Number(population.toFixed(2))]); // rounded to 2 d.p
                }
                return results;
            }
        } else if (growthRate === null) {
            if (this.model === "growth") {
                return Math.pow((finalPopulation / initialPopulation), (1 / time)) - 1;
            } else if (this.model === "decay") {
                return 1 - Math.pow((finalPopulation / initialPopulation), (1 / time));
            }
        } else if (initialPopulation === null) {
            if (this.model === "growth") {
                return finalPopulation / Math.pow((1 + growthRate), time);
            } else if (this.model === "decay") {
                return finalPopulation / Math.pow((1 - growthRate), time);
            }
        } else if (time === null) {
            if (this.model === "growth") {
                return Math.log(finalPopulation / initialPopulation) / Math.log(1 + growthRate);
            } else if (this.model === "decay") {
                return Math.log(finalPopulation / initialPopulation) / Math.log(1 - growthRate);
            }
        } else {

        }
    }
    DiscreteSolver(model) {
        if (model === "growth") {
            return this.DiscreteFunctions(this.initialPopulation, this.finalPopulation, this.growthRate, this.time);
        } else if (model === "decay") {
            return this.DiscreteFunctions(this.initialPopulation, this.finalPopulation, this.growthRate, this.time);
        }
    }

}