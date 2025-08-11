// Calculator utility functions

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Sum of a and b
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a + b;
}

/**
 * Subtracts two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Difference of a and b
 */
function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a - b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Product of a and b
 */
function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a * b;
}

/**
 * Divides two numbers
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} - Quotient of a and b
 */
function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Calculates percentage
 * @param {number} value - Value to calculate percentage of
 * @param {number} percentage - Percentage to calculate
 * @returns {number} - Calculated percentage
 */
function percentage(value, percentage) {
  if (typeof value !== 'number' || typeof percentage !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return (value * percentage) / 100;
}

/**
 * Calculates power
 * @param {number} base - Base number
 * @param {number} exponent - Exponent
 * @returns {number} - Result of base raised to exponent
 */
function power(base, exponent) {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return Math.pow(base, exponent);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  power
};