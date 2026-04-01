import express from "express";
import setupRoutes from "./src/routes/routes.js";
import userRoutes from './src/routes/userRoutes.js';
import { client, connectDB } from './db.js';
import { initDB } from "./db/init.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Initialize the database (create tables if they don't exist)
initDB().then(() => {
    console.log("Database initialized");
}).catch(err => {
    console.error("Database initialization failed:", err);
});

// Connect to DB first, then start server
connectDB().then(() => {
    console.log("Connected to PostgreSQL");

    // Setup routes AFTER DB connection
    setupRoutes(app);
    app.use('/api', userRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to PostgreSQL:", err);
});