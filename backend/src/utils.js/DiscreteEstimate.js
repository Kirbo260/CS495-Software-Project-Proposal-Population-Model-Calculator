// Discrete estimate
// Log-linear regression
export default class DiscreteEstimate {
    constructor(time, population) {
        this.time = time;
        this.population = population;
    }

    estimateDiscreteGrowthRate() {
        let logLambda = 0, lambda = 0;
        let count = 0;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        // Validate input lengths and values
        if (this.time.length !== this.population.length) {
            throw new Error("Time and population arrays must have the same length");
        }

        if (this.population.some(p => p <= 0)) {
            throw new Error("Population values must be positive");
        }

        for (let i = 0; i < this.time.length; i++) {
            const x = Number(this.time[i]);
            const y = Math.log(Number(this.population[i]));

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        }

        const n = this.time.length;

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

        // slope = ln(1 + r)
        const r = Math.exp(slope) - 1;
        return {r};
    }

}