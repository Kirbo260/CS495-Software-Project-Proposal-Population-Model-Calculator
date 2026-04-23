// Discrete estimate

export default class DiscreteEstimate {
    constructor(time, population) {
        this.time = time;
        this.population = population;
    }

    estimateDiscreteGrowthRate() {
        let logLambda = 0;
        let count = 0;
        const r = 0;

        // Validate input lengths and values
        if (this.time.length !== this.population.length) {
            throw new Error("Time and population arrays must have the same length");
        }

        if (this.population.some(p => p <= 0)) {
            throw new Error("Population values must be positive");
        }   

        for (i = 0; i < this.time.length; i++){
            let pop = this.population[i];
            let popNt = this.population[i+1];

            logLambda += Math.log(popNt) - Math.log(pop);
            count++;
        }
        
        lambda = Math.exp(logLambda/count);
        r = lambda - 1;
        return {r}; 
    }

    }