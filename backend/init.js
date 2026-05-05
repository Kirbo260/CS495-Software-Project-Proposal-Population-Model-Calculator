// for creating database tables and seeding initial data
import { client } from './db.js';

export const initDB = async () => {
    try {
        await client.query('BEGIN'); 

        // USERS TABLE
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                age INTEGER,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,

                reset_token TEXT,
                reset_token_expiry TIMESTAMPTZ,

                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // MODELS TABLE
        await client.query(`
            DO $$ 
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'model_type') THEN
                    CREATE TYPE model_type AS ENUM (
                    'logistic',
                    'continuous',
                    'discrete',
                    'predator_prey',
                    'EmComparison'
                    );
                END IF;
            END$$;
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS models (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

                name TEXT NOT NULL,
                description TEXT,
                version TEXT,
                inputs JSONB,   -- stores all values needed to replay graphs

                type model_type, -- for filtering and UI purposes

                copied_from_model_id INTEGER, -- for tracking copies

                created_at TIMESTAMP DEFAULT NOW(),
                deleted_at TIMESTAMP, -- for soft delete
                is_deleted BOOLEAN DEFAULT FALSE
            );
        `);

        // CSV TABLE
        await client.query(`
            CREATE TABLE IF NOT EXISTS csv_files (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                model_id INTEGER NOT NULL REFERENCES models(id) ON DELETE CASCADE,


                file_name TEXT NOT NULL,
                file_data BYTEA, -- store the actual file as binary data
                
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await client.query('COMMIT');
        console.log(" Database initialized successfully");
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(" Database init failed:", err);
        throw err; // re-throw to be caught in index.js
    }
};