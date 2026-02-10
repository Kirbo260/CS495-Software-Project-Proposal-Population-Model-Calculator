// Calculating population growth rate using the formula:
// Growth Rate = ((P2 - P1) / P1) * 100
// Where P1 is the initial population and P2 is the final population
class PopulationGrowthRate {
    constructor(initialPopulation, finalPopulation) {
        this.initialPopulation = initialPopulation;
        this.finalPopulation = finalPopulation;
    }

    capitalGrowthRate() {
        if (this.initialPopulation <= 0) {
            throw new Error("Initial population must be greater than zero.");
        }
        const capitalGrowthRate = ((this.finalPopulation - this.initialPopulation) / this.initialPopulation);
        return capitalGrowthRate;
    }

    percentageGrowthRate() {
        if (this.initialPopulation <= 0) {
            throw new Error("Initial population must be greater than zero.");
        }
        const growthRate = ((this.finalPopulation - this.initialPopulation) / this.initialPopulation) * 100;
        return growthRate;
    }
}

export default PopulationGrowthRate;