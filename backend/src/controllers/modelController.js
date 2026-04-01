// DB for saving and retrieving model information
import { client } from '../db.js';

// Create a new model entry
export const createModel = async (req, res) => {
    // store the model information in the database
    const { name, description, version, inputs } = req.body;

    // user_id with jwt 
    const user_id = req.user.id; // assuming auth middleware sets req.user

    try {
        const result = await client.query(
            'INSERT INTO models (user_id, name, description, version, inputs) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, name, description, version, inputs]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};