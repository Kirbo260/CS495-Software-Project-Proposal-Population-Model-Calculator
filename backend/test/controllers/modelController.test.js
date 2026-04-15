import request from "supertest";
import express from "express";
import {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel,
  deleteAllModelsForUser,
  getDeletedModels,
  restoreModel
} from "../../src/controllers/modelController.js";

import { client } from "../../db.js";

//MOCK DB
jest.mock("../../db.js", () => ({
  client: {
    query: jest.fn()
  }
}));

// APP SETUP FOR TESTING
const app = express();
app.use(express.json());

// fake auth middleware
const mockAuth = (req, res, next) => {
  req.user = { userId: 1 };
  next();
};

app.use(mockAuth);

// routes
app.post("/models", createModel);
app.get("/my", getModels);
app.get("/models/:id", getModelById);
app.put("/models/:id", updateModel);
app.delete("/models/:id", deleteModel);
app.delete("/my", deleteAllModelsForUser);
app.get("/deleted", getDeletedModels);
app.post("/restore/:id", restoreModel);

// -------------------- TESTS --------------------
afterEach(() => {
  jest.clearAllMocks();
});

describe("Model Controller", () => {

  // CREATE MODEL
  test("createModel - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, name: "test model" }]
    });

    const res = await request(app)
      .post("/models")
      .send({
        name: "test",
        description: "desc",
        version: "1",
        inputs: {},
        type: "A"
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("test model");
  });

  test("createModel - error", async () => {
    client.query.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/models")
      .send({
        name: "test",
        description: "desc",
        version: "1",
        inputs: {},
        type: "A"
      });

    expect(res.status).toBe(500);
  });

  // GET MODELS
  test("getModels - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1 }]
    });

    const res = await request(app).get("/my");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("getModels - error", async () => {
    client.query.mockRejectedValue(new Error("fail"));

    const res = await request(app).get("/my");

    expect(res.status).toBe(500);
  });

  // GET BY ID
  test("getModelById - found", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1 }]
    });

    const res = await request(app).get("/models/1");

    expect(res.status).toBe(200);
  });

  test("getModelById - not found", async () => {
    client.query.mockResolvedValue({ rows: [] });

    const res = await request(app).get("/models/999");

    expect(res.status).toBe(404);
  });

  // UPDATE
  test("updateModel - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, name: "updated" }]
    });

    const res = await request(app)
      .put("/models/1")
      .send({
        name: "updated",
        description: "desc",
        version: "2",
        inputs: {},
        type: "B"
      });

    expect(res.status).toBe(200);
  });

  test("updateModel - not found", async () => {
    client.query.mockResolvedValue({ rows: [] });

    const res = await request(app).put("/models/1").send({
      name: "x",
      description: "x",
      version: "x",
      inputs: {},
      type: "x"
    });

    expect(res.status).toBe(404);
  });

  // DELETE (soft delete)
  test("deleteModel - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1 }]
    });

    const res = await request(app).delete("/models/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Model moved to trash");
  });

  test("deleteModel - not found", async () => {
    client.query.mockResolvedValue({ rows: [] });

    const res = await request(app).delete("/models/1");

    expect(res.status).toBe(404);
  });

  // DELETE ALL
  test("deleteAllModelsForUser - success", async () => {
    client.query.mockResolvedValue({});

    const res = await request(app).delete("/my");

    expect(res.status).toBe(200);
  });

  test("deleteAllModelsForUser - error", async () => {
    client.query.mockRejectedValue(new Error("fail"));

    const res = await request(app).delete("/my");

    expect(res.status).toBe(500);
  });

  // GET DELETED
  test("getDeletedModels - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, is_deleted: true }]
    });

    const res = await request(app).get("/deleted");

    expect(res.status).toBe(200);
  });

  // RESTORE
  test("restoreModel - success", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, is_deleted: false }]
    });

    const res = await request(app).post("/restore/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Model restored");
  });

  test("restoreModel - not found", async () => {
    client.query.mockResolvedValue({ rows: [] });

    const res = await request(app).post("/restore/1");

    expect(res.status).toBe(404);
  });
});