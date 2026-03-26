// Calculate the continuous growth model for a given set of parameters
export function calculateContinuousGrowthModel(initialPopulation, growthRate, time) {
    // Continuous growth model formula: P(t) = P0 * e^(rt)
    let e = Math.exp(1); // Euler's number
    const finalPopulation = initialPopulation * Math.pow(e, (growthRate * time));
    return finalPopulation;
}

export default class ContinuousGrowthModel {
    constructor(initialPopulation, growthRate, time) {
        this.initialPopulation = initialPopulation;
        this.growthRate = growthRate;
        this.time = Array.isArray(time) ? time : [time];
    }
}