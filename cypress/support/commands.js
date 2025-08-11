// Custom Cypress Commands
// For more comprehensive examples of custom commands please read:
// https://on.cypress.io/custom-commands

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/auth/login', {
    email: email || 'admin@example.com',
    password: password || 'admin123'
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token);
    window.localStorage.setItem('user', JSON.stringify(response.body.user));
  });
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.request('POST', '/api/auth/logout');
  window.localStorage.removeItem('authToken');
  window.localStorage.removeItem('user');
});

// Create user command
Cypress.Commands.add('createUser', (userData) => {
  const defaultData = {
    email: `test${Date.now()}@example.com`,
    name: 'Test User',
    ...userData
  };
  
  return cy.request('POST', '/api/users', defaultData);
});

// Delete user command
Cypress.Commands.add('deleteUser', (userId) => {
  return cy.request('DELETE', `/api/users/${userId}`);
});

// Seed database command
Cypress.Commands.add('seedDatabase', (data) => {
  return cy.task('seedDatabase', data);
});

// Clear database command
Cypress.Commands.add('clearDatabase', () => {
  return cy.task('clearDatabase');
});

// Wait for API response
Cypress.Commands.add('waitForApi', (alias, timeout = 10000) => {
  cy.wait(alias, { timeout });
});

// Check accessibility
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  cy.checkA11y(context, options);
});

// Type with delay (for demo purposes)
Cypress.Commands.add('typeWithDelay', { prevSubject: 'element' }, (subject, text, delay = 100) => {
  cy.wrap(subject).type(text, { delay });
});

// Upload file
Cypress.Commands.add('uploadFile', (selector, fileName, fileType = '') => {
  cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64').then(content => {
      const blob = Cypress.Blob.base64StringToBlob(content, fileType);
      const file = new File([blob], fileName, { type: fileType });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      subject[0].files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
    });
  });
});

// Drag and drop
Cypress.Commands.add('dragAndDrop', (source, target) => {
  cy.get(source).trigger('dragstart');
  cy.get(target).trigger('drop');
  cy.get(source).trigger('dragend');
});

// Check toast notification
Cypress.Commands.add('checkToast', (message, type = 'success') => {
  cy.get(`[data-testid="toast-${type}"]`)
    .should('be.visible')
    .and('contain', message);
});

// Fill form
Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach(key => {
    const selector = `[data-testid="${key}"]`;
    const value = formData[key];
    
    cy.get(selector).then($el => {
      if ($el.is('select')) {
        cy.get(selector).select(value);
      } else if ($el.is(':checkbox')) {
        if (value) {
          cy.get(selector).check();
        } else {
          cy.get(selector).uncheck();
        }
      } else if ($el.is(':radio')) {
        cy.get(selector).check(value);
      } else {
        cy.get(selector).clear().type(value);
      }
    });
  });
});

// API intercept helper
Cypress.Commands.add('interceptApi', (method, url, response, alias) => {
  cy.intercept(method, url, response).as(alias);
});

// Wait for loading to complete
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});

// Tab navigation (for accessibility testing)
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  if (subject) {
    cy.wrap(subject).trigger('keydown', { keyCode: 9, which: 9 });
  } else {
    cy.get('body').trigger('keydown', { keyCode: 9, which: 9 });
  }
});