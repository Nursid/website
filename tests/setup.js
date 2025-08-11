// Jest setup file
// This file runs before each test suite

// Add custom matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  
  toContainObject(received, argument) {
    const pass = this.equals(received,
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    );
    
    if (pass) {
      return {
        message: () => `expected ${received} not to contain object ${argument}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to contain object ${argument}`,
        pass: false
      };
    }
  }
});

// Global test utilities
global.testUtils = {
  // Generate random email
  randomEmail: () => `test${Date.now()}@example.com`,
  
  // Generate random string
  randomString: (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  
  // Wait for async operations
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock console methods
  mockConsole: () => {
    const originalConsole = { ...console };
    beforeAll(() => {
      console.log = jest.fn();
      console.error = jest.fn();
      console.warn = jest.fn();
    });
    afterAll(() => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
    });
  }
};

// Set test timeout
jest.setTimeout(10000);

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});