// test for user controllers
import { createUser } from '../../src/controllers/usercontrollers.js';
import { client, connectDB } from '../../db.js';
beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await client.end();
});

describe('User Controllers', () => {
    test('createUser should create a new user', async () => {
        const req = { body: {
            first_name: 'Test',
            last_name: 'User',
            age: 30,
            email: 'testuser@example.com',
            password: 'password123'
        } };

     //manually mock res object
    let statusCode = null;
    let jsonData = null;
    const res = {
      status: (code) => { statusCode = code; return res; },
      json: (data) => { jsonData = data; return res; }
    };

    await createUser(req, res);

    if (statusCode !== 201) throw new Error(`Expected status 201, got ${statusCode}`);
    if (JSON.stringify(jsonData) !== JSON.stringify({ message: "User created successfully" })) {
      throw new Error(`Unexpected json: ${JSON.stringify(jsonData)}`);
    }

    console.log('Test passed ✅');
    });


    test('Double email should return error', async () => {
        const req = { body: {
            first_name: 'Test',
            last_name: 'User',
            age: 30,
            email: 'testuser@example.com',
            password: 'password123'
        } };

        //manually mock res object
        let statusCode = null;
        let jsonData = null;
        const res = {
          status: (code) => { statusCode = code; return res; },
          json: (data) => { jsonData = data; return res; }
        };
        await createUser(req, res);

        if (statusCode !== 500) throw new Error(`Expected status 500, got ${statusCode}`);
        if (!jsonData || !jsonData.error || !jsonData.error.includes("duplicate key value")) {
          throw new Error(`Unexpected json: ${JSON.stringify(jsonData)}`);
        }
        console.log('Test passed ✅');  
    });
});