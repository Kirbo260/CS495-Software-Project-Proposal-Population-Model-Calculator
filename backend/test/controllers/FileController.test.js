import request from "supertest";
import express from "express";
import { uploadCSV } from "../../src/controllers/FileController.js";
import { client } from "../../db.js";

//  MOCK DB CLIENT
jest.mock("../../db.js", () => ({
  client: {
    query: jest.fn()
  }
}));

//  EXPRESS APP
const app = express();
app.use(express.json());

// fake middleware to get req.file + req.parsedData
const mockUploadMiddleware = (req, res, next) => {
  req.file = req.testFile;
  req.parsedData = req.testParsedData;
  next();
};

app.post("/upload/store", (req, res, next) => {
  req.testFile = req.body.file;
  req.testParsedData = req.body.parsedData;
  next();
}, mockUploadMiddleware, uploadCSV);

//  TESTS
afterEach(() => {
  jest.clearAllMocks();
});

describe("uploadCSV controller", () => {

  // SUCCESS 
  test("should upload CSV successfully", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, file_name: "test.csv" }]
    });

    const res = await request(app)
      .post("/upload/store")
      .send({
        file: {
          originalname: "test.csv",
          buffer: Buffer.from("dummy data")
        },
        parsedData: [
          { a: 1 },
          { a: 2 },
          { a: 3 }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.file.file_name).toBe("test.csv");
    expect(res.body.preview.length).toBe(3);
  });

  // NO FILE UPLOADED
  test("should return 400 if no file uploaded", async () => {
    const res = await request(app)
      .post("/upload/store")
      .send({
        parsedData: [{ a: 1 }]
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("No file uploaded");
  });

  // INVALID PARSED DATA 
  test("should return 400 if parsedData is missing", async () => {
    const res = await request(app)
      .post("/upload/store")
      .send({
        file: {
          originalname: "test.csv",
          buffer: Buffer.from("data")
        }
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Parsed data is missing or invalid");
  });

  test("should return 400 if parsedData is not array", async () => {
    const res = await request(app)
      .post("/upload/store")
      .send({
        file: {
          originalname: "test.csv",
          buffer: Buffer.from("data")
        },
        parsedData: "invalid"
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Parsed data is missing or invalid");
  });

  //  DB ERROR 
  test("should handle database error", async () => {
    client.query.mockRejectedValue(new Error("DB crash"));

    const res = await request(app)
      .post("/upload/store")
      .send({
        file: {
          originalname: "test.csv",
          buffer: Buffer.from("data")
        },
        parsedData: [{ a: 1 }]
      });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal server error");
  });

});