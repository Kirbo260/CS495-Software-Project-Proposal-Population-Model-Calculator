// DB for saving and retrieving model information
import { client } from '../db.js';

// Create a new model entry
export const createModel = async (req, res) => {
    const { name, description, version } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO models (name, description, version) VALUES ($1, $2, $3) RETURNING *',
            [name, description, version]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};