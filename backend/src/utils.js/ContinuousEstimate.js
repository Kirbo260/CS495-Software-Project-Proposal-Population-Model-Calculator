// Estimate values for the continuous growth model using the provided data and parameters

export default class ContinuousEstimate {
    constructor(time, population) {
        this.time = time;
        this.population = population;
    }

   estimateContinuousGrowthRate() {
    const lnPop = this.population.map(p => Math.log(p));

    const n = this.time.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let i = 0; i < n; i++) {
        sumX += this.time[i];
        sumY += lnPop[i];
        sumXY += this.time[i] * lnPop[i];
        sumX2 += this.time[i] * this.time[i];
    }

    const r = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

    return r;
}
}

