// DB for saving and retrieving model information
import { client } from '../../db.js';

// Create a new model entry
export const createModel = async (req, res) => {
    // store the model information in the database
    const { name, description, version, inputs } = req.body;

    // user_id with jwt 
    const user_id = req.user.id; // assuming auth middleware sets req.user
    // error handling for missing fields
    if (!model_id) {
        return res.status(400).json({ error: "Missing model id" });
    }

    try {
        const result = await client.query(
            'INSERT INTO models (user_id, name, description, version, inputs) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, name, description, version, JSON.stringify(inputs)]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all models for the authenticated user
export const getModels = async (req, res) => {
    const user_id = req.user.id; // assuming auth middleware sets req.user
    try {
        const result = await client.query(
            'SELECT * FROM models WHERE user_id = $1',
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific model by ID
export const getModelById = async (req, res) => {
    const user_id = req.user.id; // assuming auth middleware sets req.user
    const model_id = req.params.id;
    try {
        const result = await client.query(
            'SELECT * FROM models WHERE id = $1 AND user_id = $2',
            [model_id, user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a model by ID
export const updateModel = async (req, res) => {
    const user_id = req.user.id; // assuming auth middleware sets req.user
    const model_id = req.params.id;
    const { name, description, version, inputs } = req.body;
    try {
        const result = await client.query(
            'UPDATE models SET name = $1, description = $2, version = $3, inputs = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
            [name, description, version, inputs, model_id, user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a model by ID
export const deleteModel = async (req, res) => {
    const user_id = req.user.id;
    const model_id = req.params.id;
    try {
        const result = await client.query(
            'DELETE FROM models WHERE id = $1 AND user_id = $2 RETURNING *',
            [model_id, user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }
        res.status(200).json({ message: 'Model deleted successfully' });
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete all models for a user, if they want to delete their account or just want to clear all their models
export const deleteAllModelsForUser = async (req, res) => {
    const user_id = req.user.id;
    try {
        await client.query(
            'DELETE FROM models WHERE user_id = $1',
            [user_id]
        );
        res.status(200).json({ message: 'All models deleted successfully' });
    } catch (error) {
        console.error('Error deleting models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

