import EMComparison from "../../src/services/EMComparison.js";
import ContinuousGrowthModel from "../../src/services/ContinuousGrowthModel.js";
import ErrorMetrics from "../../src/utils.js/ErrorMetrics.js";

// Mock dependencies
jest.mock("../../src/services/ContinuousGrowthModel.js");
jest.mock("../../src/utils.js/ErrorMetrics.js");

describe("EMComparison", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should auto-generate time array when time is null", () => {
    const mockResults = {
      results: [[0, 10], [1, 20], [2, 30]]
    };

    ContinuousGrowthModel.mockImplementation(() => ({
      ContinuousSolver: jest.fn().mockReturnValue(mockResults)
    }));

    ErrorMetrics.mockImplementation(() => ({
      ErrorMetricsSolver: jest.fn().mockReturnValue({ rmse: 1, mae: 2 })
    }));

    const actualValues = [10, 20, 30];

    const em = new EMComparison(
      10, null, 0.1, null, "days", null, null, actualValues
    );

    em.ModelGrowthComparison();

    expect(em.time).toEqual([0, 1, 2]); // auto-filled
  });

  test("should throw error when predicted and actual lengths differ", () => {
    const mockResults = {
      results: [[0, 10], [1, 20]] // shorter than actual
    };

    ContinuousGrowthModel.mockImplementation(() => ({
      ContinuousSolver: jest.fn().mockReturnValue(mockResults)
    }));

    const actualValues = [10, 20, 30];

    const em = new EMComparison(
      10, null, 0.1, [0,1,2], "days", null, null, actualValues
    );

    expect(() => em.ModelGrowthComparison()).toThrow(
      "Predicted and actual values must have the same length."
    );
  });

  test("should compute RMSE and MAE correctly and return smallest values", () => {
    const mockResults = {
      results: [[0, 10], [1, 20], [2, 30]]
    };

    ContinuousGrowthModel.mockImplementation(() => ({
      ContinuousSolver: jest.fn().mockReturnValue(mockResults)
    }));

    ErrorMetrics.mockImplementation(() => ({
      ErrorMetricsSolver: jest.fn().mockReturnValue({
        rmse: 5,
        mae: 3
      })
    }));

    const actualValues = [10, 20, 30];

    const em = new EMComparison(
      10, null, 0.1, [0,1,2], "days", null, null, actualValues
    );

    const result = em.ModelGrowthComparison();

    expect(result).toEqual({
      rmse: 5,
      mae: 3
    });
  });

  test("should call ContinuousGrowthModel with correct parameters", () => {
    const mockSolver = jest.fn().mockReturnValue({
      results: [[0, 10], [1, 20], [2, 30]]
    });

    ContinuousGrowthModel.mockImplementation(() => ({
      ContinuousSolver: mockSolver
    }));

    ErrorMetrics.mockImplementation(() => ({
      ErrorMetricsSolver: jest.fn().mockReturnValue({
        rmse: 1,
        mae: 1
      })
    }));

    const actualValues = [10, 20, 30];

    const em = new EMComparison(
      100, 200, 0.5, [0,1,2], "days", 1000, "continuous", actualValues
    );

    em.ModelGrowthComparison();

    expect(ContinuousGrowthModel).toHaveBeenCalledWith(
      100,
      200,
      0.5,
      null,
      null,
      [0,1,2],
      "days"
    );

    expect(mockSolver).toHaveBeenCalled();
  });

  test("should map predicted values correctly before passing to ErrorMetrics", () => {
    const mockResults = {
      results: [[0, 100], [1, 200], [2, 300]]
    };

    ContinuousGrowthModel.mockImplementation(() => ({
      ContinuousSolver: jest.fn().mockReturnValue(mockResults)
    }));

    const errorMetricsSpy = jest.fn().mockReturnValue({
      ErrorMetricsSolver: jest.fn().mockReturnValue({
        rmse: 10,
        mae: 5
      })
    });

    ErrorMetrics.mockImplementation(errorMetricsSpy);

    const actualValues = [100, 200, 300];

    const em = new EMComparison(
      10, null, 0.1, [0,1,2], "days", null, null, actualValues
    );

    em.ModelGrowthComparison();

    expect(errorMetricsSpy).toHaveBeenCalledWith(
      [100, 200, 300], // mapped values p[1]
      actualValues
    );
  });
});