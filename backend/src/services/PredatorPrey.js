// Predator-Prey model implementation in JavaScript
// This model describes the interactions between two species: a predator and its prey. The population dynamics are governed by a set of differential equations.
// The equations are as follows:
// dP/dt = aP - bP*H (Prey population growth and predation)
// dH/dt = cP*H - dH (Predator population growth and natural death) (Lotka-Volterra equations)
import TimeChecker from "../utils.js/TimeChecker.js";
import GrowthRate from "../utils.js/GrowthRate.js";

export default class PredatorPrey {
    constructor(constantA, constantB, constantC, constantH, startTime, endTime, timeChange, preyInitial, predatorInitial) {
        this.preyInitial = preyInitial; // Initial population of prey
        this.predatorInitial = predatorInitial; // Initial population of predators
        this.a = constantA; // Growth rate of prey (a)
        this.b = constantB; // Rate at which predators consume prey (b)
        this.c = constantC; // Growth rate of predators per consumed prey (c)
        this.h = constantH; // Natural death rate of predators (h)
        this.time = startTime; // Start time for the simulation
        this.endTime = endTime; // End time for the simulation
        this.timeChange = timeChange; // Time step for the simulation
    }

    // Method to calculate the population of prey and predators over time
    calculatePopulation() {
        const x = [this.preyInitial];
        const y = [this.predatorInitial];
        const tValues = [this.time];
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const h = this.h;
        const dt = this.timeChange;

        for (let i = 0, t = this.time; t <= this.endTime; t += dt, i++) {
            // Calculate the change in prey and predator populations
            const dPrey = (a * x[i] - (b * x[i] * y[i])) * dt;
            const dPredator = (c * x[i] * y[i] - (h * y[i])) * dt;

            // Update the populations & time
            x.push(Number(x[i] + dPrey).toFixed(2)); // Round to 2 decimal places for better readability
            y.push(Number(y[i] + dPredator).toFixed(2));
            tValues.push(t + dt);
        }

        return {time: tValues, prey: x, predator: y};
    }

    LoktaVolterraSolver() {
        return this.calculatePopulation();
    }

}
