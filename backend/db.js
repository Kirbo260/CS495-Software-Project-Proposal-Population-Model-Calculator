// db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pkg;

// configure your database connection
const client = new Client({
    user: process.env.DB_USER,                // your PostgreSQL username
    host: process.env.DB_HOST,               // local database
    database: process.env.DB_NAME,               // the database you created
    password: process.env.DB_PASSWORD, // your password
    port: process.env.DB_PORT,                      // default PostgreSQL port
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL successfully!');
    } catch (err) {
        console.error('Connection error', err.stack);
    }
}

export { client, connectDB };