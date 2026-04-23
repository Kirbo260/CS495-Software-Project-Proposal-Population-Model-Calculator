// Takes the common API call logic and centralizes it in one place. This helps to reduce code duplication and makes it easier to maintain the codebase.

export default function APIHelper(req, res, next) {
    req.ApiHelper = {
        initialPopulation: req.query.initialPopulation
        ? Number(req.query.initialPopulation)
        : null, // initial population can be null if we are solving for it

        finalPopulation: req.query.finalPopulation
        ? Number(req.query.finalPopulation)
        : null, // final population can be null if we are solving for it

        // growth rate for the different models, can be null if we are solving for it
        growthRate: req.query.growthRate ? Number(req.query.growthRate) : null,

        // carrying capacity for logistic growth, can be null if we are solving for it
        carryingCapacity: req.query.carryingCapacity
        ? Number(req.query.carryingCapacity)
        : null,

        // time can be a single number or a comma-separated list of numbers,
        // can be null if we are solving for it
        time: req.query.time
        ? req.query.time.includes(",")
        ? req.query.time.split(",").map(Number)
        : Number(req.query.time)
        : null, 

        // time format for the diiferent models 
        timeFormat: req.query.timeFormat || "none",

        // birth and death rates for continuous & discrete growth model, 
        // can be null if we are solving for them
        birthRate: req.query.birthRate ? Number(req.query.birthRate) : null,
        deathRate: req.query.deathRate ? Number(req.query.deathRate) : null,

        modelType: req.query.modelType, // "growth" or "decay" for discrete growth model

        validType: req.query.validType, // "predator-prey' or "other growth models" 

        actualValues: req.query.actualValues
        ? req.query.actualValues.includes(",")
        ? req.query.actualValues.split(",").map(Number)
        : Number(req.query.actualValues)
        : null, // Array of actual population values

        // We can add more parameters here as needed for other models, such as parameters specific to the predator-prey model, etc.
        a_prey: req.query.a_prey ? Number(req.query.a_prey) : null,

        b_predation: req.query.b_predation ? Number(req.query.b_predation) : null,

        c_predator: req.query.c_predator ? Number(req.query.c_predator) : null,

        d_reproduction: req.query.d_reproduction ? Number(req.query.d_reproduction) : null,
    
        timeChange : req.query.timeChange ? Number(req.query.timeChange) : null,

        finalTime : req.query.finalTime ? Number(req.query.finalTime) : null,

        preyInitial: req.query.preyInitial ? Number(req.query.preyInitial) : null,

        predatorInitial: req.query.predatorInitial ? Number(req.query.predatorInitial) : null

    }
    next();
}