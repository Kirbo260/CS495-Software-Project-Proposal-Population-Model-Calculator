// Test for Time Checker utility function
import TimeChecker from '../../src/utils.js/TimeChecker.js';;

describe('TimeChecker', () => {

    // Null input
    test('returns null if time is null', () => {
        const checker = new TimeChecker(null, "y");
        expect(checker.TimeCheck()).toBeNull();
    });

    // Single value becomes array
    test('converts single time value to array', () => {
        const checker = new TimeChecker(5, "none");
        expect(checker.TimeCheck()).toEqual([5]);
    });

    // Array remains array
    test('keeps array input unchanged when format is none', () => {
        const checker = new TimeChecker([1,2,3], "none");
        expect(checker.TimeCheck()).toEqual([1,2,3]);
    });

    // Invalid input throws error
    test('throws error for non-numeric values', () => {
        const checker = new TimeChecker(["a", 2], "none");
        expect(() => checker.TimeCheck()).toThrow("Time must be a number or an array of numbers.");
    });

    // Seconds to years
    test('converts seconds to years', () => {
        const checker = new TimeChecker([31536000], "s");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo(1, 5);
    });

    // Minutes to years
    test('converts minutes to years', () => {
        const checker = new TimeChecker([525600], "m");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo(1, 5);
    });

    // Hours to years
    test('converts hours to years', () => {
        const checker = new TimeChecker([8760], "h");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo(1, 5);
    });

    // Days to years
    test('converts days to years', () => {
        const checker = new TimeChecker([365], "d");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo(1, 5);
    });

    // Weeks to years
    test('converts weeks to years', () => {
        const checker = new TimeChecker([52], "w");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo(1, 5);
    });

    // Months to years
    test('converts months to years', () => {
        const checker = new TimeChecker([2], "mo");
        const result = checker.TimeCheck();
        expect(result[0]).toBeCloseTo( 0.16666666666666666, 5);
    });

    // Already in years
    test('returns same values if format is years', () => {
        const checker = new TimeChecker([1,2], "y");
        expect(checker.TimeCheck()).toEqual([1,2]);
    });

    //TimeDivider works correctly
    test('TimeDivider divides all elements correctly', () => {
        const checker = new TimeChecker([10,20], "none");
        const result = checker.TimeDivider([10,20], 10);
        expect(result).toEqual([1,2]);
    });

    // MaxTime returns correct max
    test('MaxTime returns maximum value', () => {
        const checker = new TimeChecker([1,5,3], "none");
        expect(checker.MaxTime()).toBe(5);
    });

});