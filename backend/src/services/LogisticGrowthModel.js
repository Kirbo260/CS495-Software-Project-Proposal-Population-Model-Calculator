// Calculating logistic growth model using the formula P(t) = K / (1 + ((K - P0) / P0) * e^(-rt))
export default class LogisticGrowthModel {
    constructor(initialPopulation, growthRate, carryingCapacity) {
        this.initialPopulation = initialPopulation;
        this.growthRate = growthRate;
        this.carryingCapacity = carryingCapacity;
    }

    populationAtTime(t) {
        const P0 = this.initialPopulation;
        const r = this.growthRate;
        const K = this.carryingCapacity;

        if (!Array.isArray(t)) {
            throw new Error("Time must be an array"); // Ensure that time is an array to allow for multiple time points 
        }

        for (let i = 0; i < t.length; i++) {
          const population = K / (1 + ((K - P0) / P0) * Math.exp(-r * t[i]));
        }
        return t.map(t => {
            const population = K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
            return [t, Math.round(population * 100) / 100]; // round to 2 decimals
        });
    }

}