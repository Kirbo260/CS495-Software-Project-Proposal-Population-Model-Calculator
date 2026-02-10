// Calculate Exponential Growth Model
// Exponential Growth Model formula: P(t) = P0 * e^(rt)
class ExponentialGrowthModel {
    constructor(initialPopulation, growthRate, time, birthRate, deathRate) {
        this.initialPopulation = initialPopulation;
        this.growthRate = growthRate;
        this.time = time;
        this.birthRate = birthRate;
        this.deathRate = deathRate;
    }

    static fromMissingRate(initialPopulation, time, birthRate, deathRate) {
        const growth = new ExponentialGrowthModel(initialPopulation, null, time, birthRate, deathRate);
        growth.mode = "missingRate";
        return growth;
    }

    static NotMissingRate(initialPopulation, growthRate, time, birthRate, deathRate) {
        const growth = new ExponentialGrowthModel(initialPopulation, growthRate, time, birthRate, deathRate);
        growth.mode = "notMissingRate";
        return growth;
    }

    // Count values in time array
    countFunction(time) {
        return time.length;
    }

    calculatePopulation() {
        const results = [];

        if (!Array.isArray(this.time)) {
            throw new Error("Time must be an array");
        }

        if (this.mode === "missingRate") {
             const r = (this.birthRate - this.deathRate)/this.initialPopulation;
            for (let i = 0; i < this.countFunction(this.time); i++) {
                results.push([this.time[i], this.initialPopulation * Math.exp(r * this.time[i])]);
            }
        } else if (this.mode === "notMissingRate") {
            for (let i = 0; i < this.countFunction(this.time); i++) {
                results.push([this.time[i], this.initialPopulation * Math.exp(this.growthRate * this.time[i])]);
            }
        } else {
            throw new Error("Invalid mode for ExponentialGrowthModel");
        }
        return results;
    }
}

export default ExponentialGrowthModel;