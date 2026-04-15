import ContinuousEstimate from "../../src/utils.js/ContinuousEstimate.js";

describe("ContinuousEstimate", () => {

  // Basic correct exponential growth

  test("should estimate correct positive growth rate", () => {
    // Exponential growth: P = e^(0.1t)
    const time = [0, 1, 2, 3, 4];
    const population = [
      1,
      Math.exp(0.1),
      Math.exp(0.2),
      Math.exp(0.3),
      Math.exp(0.4)
    ];

    const estimator = new ContinuousEstimate(time, population);
    const r = estimator.estimateContinuousGrowthRate();

    expect(r).toBeCloseTo(0.1, 5);
  });

  // Zero growth case
  test("should return ~0 for constant population", () => {
    const time = [0, 1, 2, 3];
    const population = [10, 10, 10, 10];

    const estimator = new ContinuousEstimate(time, population);
    const r = estimator.estimateContinuousGrowthRate();

    expect(r).toBeCloseTo(0, 5);
  });

  // Negative growth case
  test("should estimate negative growth rate", () => {
    const time = [0, 1, 2, 3];
    const population = [
      100,
      80,
      64,
      51.2
    ]; // approx exponential decay r = -0.223

    const estimator = new ContinuousEstimate(time, population);
    const r = estimator.estimateContinuousGrowthRate();

    expect(r).toBeCloseTo(-0.223, 2);
  });


  // Invalid: mismatched arrays
  test("should throw error for mismatched input lengths", () => {
    const time = [0, 1, 2];
    const population = [10, 20];

    const estimator = new ContinuousEstimate(time, population);

    expect(() => {
      estimator.estimateContinuousGrowthRate();
    }).toThrow();
  });

  // Invalid: zero or negative population
  test("should throw error for invalid population values", () => {
    const time = [0, 1, 2];
    const population = [10, 0, 20]; // invalid (log(0))

    const estimator = new ContinuousEstimate(time, population);

    expect(() => {
      estimator.estimateContinuousGrowthRate();
    }).toThrow();
  });

  // Invalid: non-numeric input
  test("should handle non-numeric values safely", () => {
    const time = [0, "1", 2];
    const population = [10, 20, 30];

    const estimator = new ContinuousEstimate(time, population);

    // depending on your implementation this may throw or NaN
    expect(() => {
      estimator.estimateContinuousGrowthRate();
    }).not.toThrow();
  });

});