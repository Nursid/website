// Cypress E2E support file
// This file is processed and loaded automatically before test files

// Import commands
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  return true;
});

// Before each test
beforeEach(() => {
  // Clear local storage
  cy.clearLocalStorage();
  
  // Clear cookies
  cy.clearCookies();
  
  // Set default headers
  cy.intercept('**/*', (req) => {
    req.headers['X-Cypress-Test'] = 'true';
  });
});

// After each test
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot(`${Cypress.currentTest.title}-failed`);
  }
});