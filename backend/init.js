// for creating database tables and seeding initial data
import { client } from './db.js';

export const initDB = async () => {
    try {
        // USERS TABLE
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                age INTEGER,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // MODELS TABLE
        await client.query(`
            CREATE TABLE IF NOT EXISTS models (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

                name TEXT NOT NULL,
                description TEXT,
                version TEXT,
                type ENUM('logistic', 'continuous', 'discrete', 'predator_prey', 'EmComparison'), 

                inputs JSONB,   -- stores all values needed to replay graphs

                created_at TIMESTAMP DEFAULT NOW() 
            );
        `);

        // CSV TABLE
        await client.query(`
            CREATE TABLE IF NOT EXISTS csv_files (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                filename TEXT NOT NULL,
                file BYTEA, -- store the actual file as binary data
                data JSONB,  -- store CSV data as JSON for easy retrieval
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log(" Database initialized successfully");
    } catch (err) {
        console.error(" Database init failed:", err);
    }
};