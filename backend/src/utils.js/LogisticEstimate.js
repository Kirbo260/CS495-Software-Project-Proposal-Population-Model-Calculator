// Logistic Growth Parameter estimation. 

export default class LogisticEstimate {
    constructor(time, population) {
        this.time = time;
        this.population = population;
    }

   estimateLogisticGrowthRate() {
    const r = 0;
    const K = 0; 

    // Validate input lengths and values
    if (this.time.length !== this.population.length) {
        throw new Error("Time and population arrays must have the same length");
    }

    // Ensure all population values are positive to avoid issues with logarithm
    if (this.population.some(p => p <= 0)) {
        throw new Error("Population values must be positive");
    }

    K = Math.max(this.population); // max population equals Carrying Capacity


    


    return {r , K} // rate and carrying capacity
}

}
