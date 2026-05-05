// DB for saving and retrieving model information
import { client } from '../../db.js';

// Create a new model entry
export const createModel = async (req, res) => {
    // store the model information in the database
    const { name, description, version, inputs, type } = req.body;

    // user_id with jwt 
    const user_id = req.user.userId; // assuming auth middleware sets req.user
    // error handling for missing fields

    try {
        const result = await client.query(
            'INSERT INTO models (user_id, name, description, version, inputs, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, name, description, version, JSON.stringify(inputs), type]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all models for the authenticated user
export const getModels = async (req, res) => {
    const user_id = req.user.userId; // assuming auth middleware sets req.user
    try {
        const result = await client.query(
            'SELECT * FROM models WHERE user_id = $1 AND is_deleted = FALSE',
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
    const user_id = req.user.userId; // assuming auth middleware sets req.user
    const model_id = req.params.id;
    try {
        const result = await client.query(
            'SELECT * FROM models WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE',
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
    const user_id = req.user.userId; // assuming auth middleware sets req.user
    const model_id = req.params.id;
    const { name, description, version, inputs, type } = req.body;
    try {
        const result = await client.query(
            'UPDATE models SET name = $1, description = $2, version = $3, inputs = $4, type = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
            [name, description, version, JSON.stringify(inputs), type, model_id, user_id]
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
    const user_id = req.user.userId;
    const model_id = req.params.id;

    try {
        const result = await client.query(
            `UPDATE models 
             SET is_deleted = TRUE, deleted_at = NOW()
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [model_id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }

        res.status(200).json({ message: 'Model moved to trash' });
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete all models for a user, if they want to delete their account or just want to clear all their models
export const deleteAllModelsForUser = async (req, res) => {
    const user_id = req.user.userId;
    try {
        await client.query(
            `UPDATE models 
             SET is_deleted = TRUE, deleted_at = NOW()
             WHERE user_id = $1`,
            [user_id]
        );
        res.status(200).json({ message: 'All models deleted successfully' });
    } catch (error) {
        console.error('Error deleting models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getDeletedModels = async (req, res) => {
    const user_id = req.user.userId;

    try {
        const result = await client.query(
            'SELECT * FROM models WHERE user_id = $1 AND is_deleted = TRUE',
            [user_id]
        );

        //console.log(localStorage.getItem("token"));
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching deleted models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// restore a deleted model
export const restoreModel = async (req, res) => {
    const user_id = req.user.userId;
    const model_id = req.params.id;

    try {
        const result = await client.query(
            `UPDATE models 
             SET is_deleted = FALSE, deleted_at = NULL
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [model_id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }

        res.status(200).json({ message: 'Model restored', model: result.rows[0] });
    } catch (error) {
        console.error('Error restoring model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// permanently delete a model from the database
export const permanentlyDeleteModel = async (req, res) => {
    const user_id = req.user.userId;
    const model_id = req.params.id;
    try {
        const result = await client.query(
            'DELETE FROM models WHERE id = $1 AND user_id = $2 RETURNING *',
            [model_id, user_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }
        res.status(200).json({ message: 'Model permanently deleted', model: result.rows[0] });
    }
    catch (error) {
        console.error('Error permanently deleting model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Share a model with another user by email 
export const shareModel = async (req, res) => {
    const user_id = req.user.userId; // the user who is sharing the model
    const model_id = req.params.id; // the model being shared
    const { email } = req.body; // the email of the user to share with

    try {

        // Check if the user to share with exists
        const userResult = await client.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );
        if (userResult.rows.length === 0) { // user not found
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the model exists and belongs to the user
        const modelResult = await client.query(
            'SELECT * FROM models WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE',
            [model_id, user_id]
        );
        if (modelResult.rows.length === 0) {
            return res.status(404).json({ error: 'Model not found or not authorized' });
        }

        // Share the model with the user
        await client.query(
             'INSERT INTO models (user_id, name, description, version, inputs, type, copied_from) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [userResult.rows[0].id, modelResult.rows[0].name, modelResult.rows[0].description,
            modelResult.rows[0].version, modelResult.rows[0].inputs, modelResult.rows[0].type, model_id]
        );

        res.status(200).json({ message: 'Model shared successfully' });
    } catch (error) {
        console.error('Error sharing model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
