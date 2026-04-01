import {
    createModel,
    getModels,
    getModelById,
    updateModel,
    deleteModel,
    deleteAllModelsForUser
} from '../../src/controllers/modelController.js';

import { client } from '../db.js';

// mock DB
jest.mock('../db.js', () => ({
    client: {
        query: jest.fn()
    }
}));

describe('Models Controllers', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createModel should create a new model', async () => {
        const req = {
            body: {
                name: 'Log Model',
                description: 'Test model',
                version: '1.0',
                inputs: { x: [1,2,3] }
            },
            user: { id: 1 }
        };

        client.query.mockResolvedValue({
            rows: [{ id: 1, ...req.body, user_id: 1 }]
        });

        let statusCode = null;
        let jsonData = null;

        const res = {
            status: (code) => { statusCode = code; return res; },
            json: (data) => { jsonData = data; return res; }
        };

        await createModel(req, res);

        if (statusCode !== 201) throw new Error(`Expected 201, got ${statusCode}`);
        if (!jsonData.name) throw new Error('Model not returned');

        console.log('createModel test passed');
    });

    test('getModels should return user models', async () => {
        const req = {
            user: { id: 1 }
        };

        client.query.mockResolvedValue({
            rows: [
                { id: 1, name: 'Model 1' },
                { id: 2, name: 'Model 2' }
            ]
        });

        let resData;

        const res = {
            status: () => res,
            json: (data) => { resData = data; return res; }
        };

        await getModels(req, res);

        if (resData.length !== 2) {
            throw new Error(`Expected 2 models, got ${resData.length}`);
        }

        console.log('getModels test passed');
    });

    test('getModelById should return model', async () => {
        const req = {
            params: { id: 1 },
            user: { id: 1 }
        };

        client.query.mockResolvedValue({
            rows: [{ id: 1, name: 'Test Model' }]
        });

        let resData;
        let statusCode;

        const res = {
            status: (code) => { statusCode = code; return res; },
            json: (data) => { resData = data; return res; }
        };

        await getModelById(req, res);

        if (statusCode !== 200) throw new Error(`Expected 200, got ${statusCode}`);
        if (!resData.id) throw new Error('Model not returned');

        console.log('getModelById test passed');
    });

    test('updateModel should update and return model', async () => {
        const req = {
            params: { id: 1 },
            user: { id: 1 },
            body: {
                name: 'Updated',
                description: 'Updated desc',
                version: '2.0',
                inputs: {}
            }
        };

        client.query.mockResolvedValue({
            rows: [{ id: 1, ...req.body }]
        });

        let resData;
        let statusCode;

        const res = {
            status: (code) => { statusCode = code; return res; },
            json: (data) => { resData = data; return res; }
        };

        await updateModel(req, res);

        if (statusCode !== 200) throw new Error(`Expected 200, got ${statusCode}`);
        if (resData.name !== 'Updated') throw new Error('Update failed');

        console.log('updateModel test passed');
    });

    test('deleteModel should delete model', async () => {
        const req = {
            params: { id: 1 },
            user: { id: 1 }
        };

        client.query.mockResolvedValue({
            rows: [{ id: 1 }]
        });

        let resData;
        let statusCode;

        const res = {
            status: (code) => { statusCode = code; return res; },
            json: (data) => { resData = data; return res; }
        };

        await deleteModel(req, res);

        if (statusCode !== 200) throw new Error(`Expected 200, got ${statusCode}`);
        if (!resData.message.includes('deleted')) {
            throw new Error('Delete failed');
        }

        console.log('deleteModel test passed');
    });

    test('deleteAllModelsForUser should delete all models', async () => {
        const req = {
            user: { id: 1 }
        };

        client.query.mockResolvedValue({});

        let resData;

        const res = {
            status: () => res,
            json: (data) => { resData = data; return res; }
        };

        await deleteAllModelsForUser(req, res);

        if (!resData.message) throw new Error('Delete all failed');

        console.log('deleteAllModels test passed');
    });

});