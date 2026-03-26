// Calculates the growth rate (r) for the Exponential Growth Model using the formula: r = (ln(P(t)/P0)) / t
export default class GrowthRate {
    constructor(birthRate, deathRate, growthRate) {
        this.birthRate = birthRate;
        this.deathRate = deathRate;
        this.growthRate = growthRate;
    }   

    calculateGrowthRate() {
        if (this.birthRate === null && this.deathRate !== null && this.growthRate !== null) {
            return null; // User left the field blank,
        } 
        else if (this.growthRate !== null) {
            return this.growthRate; // User provided a value for growth rate, return it directly
        }
        else if (this.birthRate !== null && this.deathRate !== null) {
            if (this.birthRate < 0 || this.deathRate < 0) { // Validate that birth and death rates are non-negative
                throw new Error("Birth rate and death rate must be non-negative.");
            }

            if (this.birthRate > this.deathRate) {
                return this.birthRate - this.deathRate; // Calculate growth rate using the formula: r = b - d
            }

            return this.deathRate - this.birthRate; // Calculate growth rate using the formula: r = d - b
        } 
        else {
            throw new Error("Please provide either the growth rate or both birth and death rates to calculate the growth rate.");
        }
    }

    GrowthRateSolver() {
        const r = this.calculateGrowthRate();
        return r !== null ? Number(r.toFixed(4)) : null; // Return the growth rate rounded to 4 decimal places, or null if it cannot be calculated
    }
}