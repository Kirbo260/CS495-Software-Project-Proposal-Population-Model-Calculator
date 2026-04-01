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

                inputs JSONB,   -- stores all values needed to replay graphs

                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log(" Database initialized successfully");
    } catch (err) {
        console.error(" Database init failed:", err);
    }
};