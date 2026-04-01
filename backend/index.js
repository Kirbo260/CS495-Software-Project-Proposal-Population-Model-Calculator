import express from "express";
import setupRoutes from "./src/routes/routes.js";
import userRoutes from './src/routes/userRoutes.js';
import { connectDB } from './db.js';
import { initDB } from "./init.js";

const app = express();
const PORT = 5000;

app.use(express.json());

connectDB().then(async () => {
    console.log("Connected to PostgreSQL");

    await initDB();
    console.log("Database initialized");

    setupRoutes(app);
    app.use('/api', userRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to PostgreSQL:", err);
  });