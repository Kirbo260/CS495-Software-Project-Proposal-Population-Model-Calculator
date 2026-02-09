import { add } from "../services/CarryingCapacity.js";
import { subtract } from "../services/ContinuousGrowthModel.js";

export function setupRoutes(app) {
    app.get("/", (req, res) => {
  res.send("Hello World");
});

  app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "a and b must be numbers" });
    }
    const result = add(a, b);
    res.json({ result });
  });

  app.get('/subtract', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "a and b must be numbers" });
    }
    const result = subtract(a, b);
    res.json({ result });
  });   
}

export default setupRoutes;