// Calculates the growth rate (r) for the Exponential Growth Model using the formula:
// r = b - d, where b is the birth rate and d is the death rate. 
// If the growth rate is provided, it returns it directly. 
// If the birth and death rates are provided, it calculates the growth rate using the formula. 
// If the user leaves the growth rate field blank, 
// it returns null to indicate that it cannot be calculated without both birth and death rates. 
// It also validates that birth and death rates are non-negative.
export default class GrowthRate {
    constructor(birthRate, deathRate, growthRate) {
        this.birthRate = birthRate;
        this.deathRate = deathRate;
        this.growthRate = growthRate;
    }

    calculateGrowthRate() {
        if (this.birthRate == null && this.deathRate !== null && this.growthRate !== null) {
            return this.growthRate; // User provided a value for growth rate, return it directly
        }
        else if (this.growthRate !== null && this.birthRate == null && this.deathRate == null) {
            return this.growthRate; // User provided a value for growth rate, return it directly
        }
        else if (this.deathRate == null && this.birthRate !== null && this.growthRate !== null) {
            return this.growthRate; // User provided a value for growth rate, return it directly
        }
        else if (this.growthRate !== null && this.birthRate !== null && this.deathRate !== null) {
            return this.growthRate; // User provided a value for growth rate, return it directly
        }
        else if (this.growthRate == null && this.birthRate == null && this.deathRate == null) {
            return null; // User did not provide any values, cannot calculate growth rate
        }
        else if (this.birthRate !== null && this.deathRate !== null && this.growthRate == null) { 
            // If growth rate is missing but birth and death rates are provided, calculate it
            if (this.birthRate < 0 || this.deathRate < 0) { // Validate that birth and death rates are non-negative
                throw new Error("Birth rate and death rate must be non-negative.");
            }

            if (this.birthRate > this.deathRate) {
                return this.birthRate - this.deathRate; // Calculate growth rate using the formula: r = b - d
            }
            return this.birthRate - this.deathRate; // Calculate growth rate using the formula: r = b - d
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