// Unit tests for calculator utilities
const {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  power
} = require('../../src/utils/calculator');

describe('Calculator Utilities', () => {
  
  describe('add', () => {
    // Basic functionality
    test('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
      expect(add(100, 200)).toBe(300);
    });

    test('should add negative numbers correctly', () => {
      expect(add(-5, -3)).toBe(-8);
      expect(add(-10, 5)).toBe(-5);
      expect(add(10, -5)).toBe(5);
    });

    test('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(add(1.5, 2.5)).toBe(4);
      expect(add(-1.5, 1.5)).toBe(0);
    });

    test('should handle zero', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(5, 0)).toBe(5);
      expect(add(0, -5)).toBe(-5);
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => add('2', 3)).toThrow(TypeError);
      expect(() => add(2, '3')).toThrow(TypeError);
      expect(() => add(null, 3)).toThrow(TypeError);
      expect(() => add(undefined, 3)).toThrow(TypeError);
      expect(() => add({}, [])).toThrow(TypeError);
    });
  });

  describe('subtract', () => {
    // Basic functionality
    test('should subtract two positive numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(20, 10)).toBe(10);
      expect(subtract(100, 50)).toBe(50);
    });

    test('should handle negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
      expect(subtract(-10, 5)).toBe(-15);
      expect(subtract(10, -5)).toBe(15);
    });

    test('should handle decimal numbers', () => {
      expect(subtract(0.5, 0.3)).toBeCloseTo(0.2);
      expect(subtract(2.5, 1.5)).toBe(1);
      expect(subtract(1.5, 1.5)).toBe(0);
    });

    test('should handle zero', () => {
      expect(subtract(0, 0)).toBe(0);
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => subtract('5', 3)).toThrow(TypeError);
      expect(() => subtract(5, '3')).toThrow(TypeError);
      expect(() => subtract(NaN, 3)).toThrow(TypeError);
    });
  });

  describe('multiply', () => {
    // Basic functionality
    test('should multiply two positive numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(5, 4)).toBe(20);
      expect(multiply(10, 10)).toBe(100);
    });

    test('should handle negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
      expect(multiply(2, -3)).toBe(-6);
    });

    test('should handle decimal numbers', () => {
      expect(multiply(0.5, 0.5)).toBe(0.25);
      expect(multiply(2.5, 2)).toBe(5);
      expect(multiply(0.1, 10)).toBe(1);
    });

    test('should handle multiplication by zero', () => {
      expect(multiply(0, 0)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(-5, 0)).toBe(0);
    });

    test('should handle multiplication by one', () => {
      expect(multiply(5, 1)).toBe(5);
      expect(multiply(1, 5)).toBe(5);
      expect(multiply(-5, 1)).toBe(-5);
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => multiply('2', 3)).toThrow(TypeError);
      expect(() => multiply(2, '3')).toThrow(TypeError);
      expect(() => multiply([], {})).toThrow(TypeError);
    });
  });

  describe('divide', () => {
    // Basic functionality
    test('should divide two positive numbers correctly', () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(20, 4)).toBe(5);
      expect(divide(100, 10)).toBe(10);
    });

    test('should handle negative numbers', () => {
      expect(divide(-6, 2)).toBe(-3);
      expect(divide(-6, -2)).toBe(3);
      expect(divide(6, -2)).toBe(-3);
    });

    test('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
      expect(divide(1, 3)).toBeCloseTo(0.333333);
      expect(divide(7, 4)).toBe(1.75);
    });

    test('should handle decimal inputs', () => {
      expect(divide(0.5, 0.5)).toBe(1);
      expect(divide(2.5, 0.5)).toBe(5);
      expect(divide(1, 0.5)).toBe(2);
    });

    // Division by zero
    test('should throw Error for division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
      expect(() => divide(-5, 0)).toThrow('Division by zero is not allowed');
      expect(() => divide(0, 0)).toThrow('Division by zero is not allowed');
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => divide('6', 2)).toThrow(TypeError);
      expect(() => divide(6, '2')).toThrow(TypeError);
      expect(() => divide(true, false)).toThrow(TypeError);
    });
  });

  describe('percentage', () => {
    // Basic functionality
    test('should calculate percentage correctly', () => {
      expect(percentage(100, 10)).toBe(10);
      expect(percentage(50, 20)).toBe(10);
      expect(percentage(200, 50)).toBe(100);
    });

    test('should handle decimal percentages', () => {
      expect(percentage(100, 0.5)).toBe(0.5);
      expect(percentage(100, 2.5)).toBe(2.5);
      expect(percentage(50, 10.5)).toBe(5.25);
    });

    test('should handle zero percentage', () => {
      expect(percentage(100, 0)).toBe(0);
      expect(percentage(50, 0)).toBe(0);
      expect(percentage(0, 0)).toBe(0);
    });

    test('should handle percentages over 100', () => {
      expect(percentage(100, 150)).toBe(150);
      expect(percentage(50, 200)).toBe(100);
    });

    test('should handle negative values', () => {
      expect(percentage(-100, 10)).toBe(-10);
      expect(percentage(100, -10)).toBe(-10);
      expect(percentage(-100, -10)).toBe(10);
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => percentage('100', 10)).toThrow(TypeError);
      expect(() => percentage(100, '10')).toThrow(TypeError);
      expect(() => percentage(null, undefined)).toThrow(TypeError);
    });
  });

  describe('power', () => {
    // Basic functionality
    test('should calculate power correctly', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
      expect(power(10, 3)).toBe(1000);
    });

    test('should handle power of zero', () => {
      expect(power(5, 0)).toBe(1);
      expect(power(10, 0)).toBe(1);
      expect(power(-5, 0)).toBe(1);
      expect(power(0, 0)).toBe(1); // Mathematical convention
    });

    test('should handle power of one', () => {
      expect(power(5, 1)).toBe(5);
      expect(power(10, 1)).toBe(10);
      expect(power(-5, 1)).toBe(-5);
    });

    test('should handle negative exponents', () => {
      expect(power(2, -1)).toBe(0.5);
      expect(power(4, -1)).toBe(0.25);
      expect(power(10, -2)).toBe(0.01);
    });

    test('should handle negative base', () => {
      expect(power(-2, 2)).toBe(4);
      expect(power(-2, 3)).toBe(-8);
      expect(power(-3, 2)).toBe(9);
    });

    test('should handle decimal base and exponents', () => {
      expect(power(0.5, 2)).toBe(0.25);
      expect(power(2, 0.5)).toBeCloseTo(1.414);
      expect(power(9, 0.5)).toBe(3);
    });

    // Error handling
    test('should throw TypeError for non-numeric inputs', () => {
      expect(() => power('2', 3)).toThrow(TypeError);
      expect(() => power(2, '3')).toThrow(TypeError);
      expect(() => power([], null)).toThrow(TypeError);
    });
  });
});