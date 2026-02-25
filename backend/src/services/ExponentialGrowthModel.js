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
            const r = (this.birthRate - this.deathRate) / this.initialPopulation; // to be corrected based on the actual formula for growth rate when birth and death rates are given

            for (let i = 0; i < this.countFunction(this.time); i++) {
                const population =
                    this.initialPopulation * Math.exp(r * this.time[i]);

                results.push([
                    this.time[i],
                    Number(population.toFixed(2))  // rounded to 2 d.p
                ]);
            }

        } else if (this.mode === "notMissingRate") {

            for (let i = 0; i < this.countFunction(this.time); i++) {
                const population =
                    this.initialPopulation * Math.exp(this.growthRate * this.time[i]);

                results.push([
                    this.time[i],
                    Number(population.toFixed(2))  // rounded to 2 d.p
                ]);
            }

        } else {
            throw new Error("Invalid mode for ExponentialGrowthModel");
        }

        return results;
    }
}

export default ExponentialGrowthModel;