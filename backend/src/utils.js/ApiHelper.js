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

        modelType: req.query.modelType // "growth" or "decay" for discrete growth model
    }
    next();
}