// db.js
import pkg from 'pg';
const { Client } = pkg;

// configure your database connection
const client = new Client({
    user: 'postgres',                // your PostgreSQL username
    host: 'localhost',               // local database
    database: 'populationmodels',               // the database you created
    password: 'Arsenal@Inter18', // your password
    port: 5432,                      // default PostgreSQL port
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