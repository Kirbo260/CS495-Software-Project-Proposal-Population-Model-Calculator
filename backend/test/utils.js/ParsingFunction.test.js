import parseCSV from "../../src/utils.js/ParsingFunction.js";
import Papa from "papaparse";

jest.mock("papaparse", () => ({
  __esModule: true,
  default: {
    parse: jest.fn()
  }
}));

describe("parseCSV", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should resolve parsed CSV data", async () => {
    const mockData = [{ name: "A" }, { name: "B" }];

    Papa.parse.mockImplementation((file, config) => {
      config.complete({ data: mockData });
    });

    const result = await parseCSV("file.csv");

    expect(result).toEqual(mockData);
  });

  test("should reject on error", async () => {
    const error = new Error("fail");

    Papa.parse.mockImplementation((file, config) => {
      config.error(error);
    });

    await expect(parseCSV("file.csv")).rejects.toThrow("fail");
  });

});