// Controller for signing up a  user
import { client } from '../../db.js';

export async function createUser(req, res) {
    const { first_name, last_name, age, email, password } = req.body;
    try {
        await client.query(
            "INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5)",
            [first_name, last_name, age, email, password]
        );
        res.status(201).json({ message: "User created successfully" });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" }); 
    }
    
}

