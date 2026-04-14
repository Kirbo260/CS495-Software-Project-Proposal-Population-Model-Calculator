// Predator-Prey model using RK4 (Runge–Kutta 4th order)
export default class PredatorPrey {
    constructor(a_prey, b_predation, c_predator, d_reproduction, startTime, endTime, timeChange, preyInitial, predatorInitial) {
        this.preyInitial = Number(preyInitial);
        this.predatorInitial = Number(predatorInitial);

        this.a = Number(a_prey);
        this.b = Number(b_predation);
        this.c = Number(c_predator);
        this.d = Number(d_reproduction);

        this.time = Number(startTime);
        this.endTime = Number(endTime);
        this.dt = Number(timeChange);
    }

    // Derivatives
    dPrey(prey, predator) {
        return this.a * prey - (this.b * prey * predator);
    }

    dPredator(prey, predator) {
        return this.c * prey * predator - (this.d * predator);
    }

    calculatePopulation() {
        let prey = this.preyInitial;
        let predator = this.predatorInitial;
        let t = this.time;

        const x = [prey];
        const y = [predator];
        const tValues = [t];

        const dt = this.dt;

        while (t < this.endTime - dt) {

            // RK4 for prey
            const k1x = this.dPrey(prey, predator) * dt;
            const k1y = this.dPredator(prey, predator) * dt;

            const k2x = this.dPrey(prey + 0.5 * k1x, predator + 0.5 * k1y) * dt;
            const k2y = this.dPredator(prey + 0.5 * k1x, predator + 0.5 * k1y) * dt;

            const k3x = this.dPrey(prey + 0.5 * k2x, predator + 0.5 * k2y) * dt;
            const k3y = this.dPredator(prey + 0.5 * k2x, predator + 0.5 * k2y) * dt;

            const k4x = this.dPrey(prey + k3x, predator + k3y) * dt;
            const k4y = this.dPredator(prey + k3x, predator + k3y) * dt;

            // Update state
            // prey + dx is the RK4 formula for updating the state
            // dx = (k1 + 2*k2 + 2*k3 + k4)/6
            prey = prey + (1 / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
            predator = predator + (1 / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);

            t += dt;

            x.push(prey);
            y.push(predator);
            tValues.push(Number(t.toFixed(4)));
        }

        if (prey < 0 || predator < 0) {
            return {
                time: tValues,
                prey: x,
                predator: y,
                error: "Population became negative — simulation stopped early"
            };
        }

        return {
            time: tValues,
            prey: x,
            predator: y
        };
    }


    LoktaVolterraSolver() {
        return this.calculatePopulation();
    }
}