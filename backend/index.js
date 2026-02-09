import express from "express";
import setupRoutes from "./src/routes/routes.js";

const app = express();
const PORT = 5000;

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
