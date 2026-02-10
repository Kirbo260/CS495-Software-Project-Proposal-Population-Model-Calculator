// Calculating Carrying Capacity using the formula:
// Carrying Capacity = (Birth Rate - Death Rate) * Population Size
class CarryingCapacity {
    constructor(birthRate, deathRate, populationSize) {
        this.birthRate = birthRate;
        this.deathRate = deathRate;
        this.populationSize = populationSize;
    }

    calculateCarryingCapacity() {
        const carryingCapacity = (this.birthRate - this.deathRate) * this.populationSize;
        return carryingCapacity;
    }
}

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export default CarryingCapacity;
