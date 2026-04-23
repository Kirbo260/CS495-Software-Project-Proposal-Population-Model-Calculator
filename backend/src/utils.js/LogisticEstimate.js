// Logistic Growth Parameter estimation. 
// Nonlinear curve fitting (grid search)

export default class LogisticEstimate {
    constructor(time, population) {
        this.time = time;
        this.population = population;
    }

   estimateLogisticGrowthRate() { 
     let count = 0; 

    // Validate input lengths and values
    if (this.time.length !== this.population.length) {
        throw new Error("Time and population arrays must have the same length");
    }

    // Ensure all population values are positive to avoid issues with logarithm
    if (this.population.some(p => p < 0)) {
        throw new Error("Population values must be positive");
    }

    const P0 = this.population[0]; // Get initial population; 
    
    // assign best value variables
    let bestError = Infinity, bestK = 0, bestr= 0; 

    // Search ranges, Numbers are assumed
    for (let K = Math.max(...this.population); K < 10000; K += 50){
        for (let r = 0.001; r < 1; r += 0.001){
            let error = 0; 

            // calculate the error = Sum(Actual - Predicted)^2
           this.time.forEach((t,i) => {
                const predicted = K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
                error += Math.pow((this.population[i] - predicted) , 2);
                count ++;
           }); 

           if (error < bestError){
                bestError = error;
                bestK = K;
                bestr = r; 
           }

        }

    }    

    return { r: bestr , K : bestK } // rate and carrying capacity
}

}
