# Test Documentation

## Overview
This project includes a comprehensive test suite with unit tests, integration tests, and end-to-end tests to ensure code quality and reliability.

## Test Structure

```
tests/
├── unit/                 # Unit tests for individual functions/components
│   ├── validation.test.js
│   ├── calculator.test.js
│   └── userService.test.js
├── integration/          # Integration tests for API endpoints
│   └── api.test.js
└── setup.js             # Jest setup and configuration

cypress/
├── e2e/                 # End-to-end tests
│   └── user-flow.cy.js
├── support/             # Cypress support files
│   ├── commands.js      # Custom commands
│   └── e2e.js          # E2E configuration
└── fixtures/            # Test data fixtures
```

## Running Tests

### Unit and Integration Tests (Jest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test validation.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should validate email"
```

### End-to-End Tests (Cypress)

```bash
# Open Cypress Test Runner
npm run test:e2e:open

# Run Cypress tests headlessly
npm run test:e2e

# Run specific test file
npx cypress run --spec "cypress/e2e/user-flow.cy.js"
```

## Test Coverage

### Unit Test Coverage

The project maintains a minimum of 80% code coverage for:
- Statements
- Branches
- Functions
- Lines

View coverage report:
```bash
npm run test:coverage
open coverage/index.html
```

### What's Tested

#### Unit Tests
- **Validation Utilities**: Email, password, phone, URL validation
- **Calculator Functions**: Mathematical operations with error handling
- **User Service**: CRUD operations, search functionality

#### Integration Tests
- **API Endpoints**: User management, authentication
- **Error Handling**: 404s, malformed requests
- **Concurrent Operations**: Multiple simultaneous requests

#### E2E Tests
- **User Flows**: Registration, login, profile management
- **Navigation**: Routing, browser history
- **Responsive Design**: Mobile, tablet, desktop views
- **Accessibility**: Keyboard navigation, ARIA labels

## Test Patterns and Best Practices

### 1. Test Organization
```javascript
describe('Component/Module Name', () => {
  describe('Specific Functionality', () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### 2. Test Data
- Use factory functions for test data
- Clean up after each test
- Use meaningful test data names

### 3. Async Testing
```javascript
// Using async/await
test('async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});

// Using promises
test('promise operation', () => {
  return promiseFunction().then(result => {
    expect(result).toBe('expected');
  });
});
```

### 4. Mocking
```javascript
// Mock external dependencies
jest.mock('./externalModule');

// Spy on functions
const spy = jest.spyOn(object, 'method');
expect(spy).toHaveBeenCalledWith('argument');
```

## Custom Test Utilities

### Jest Custom Matchers
- `toBeWithinRange(min, max)`: Check if number is within range
- `toContainObject(object)`: Check if array contains object

### Cypress Custom Commands
- `cy.login(email, password)`: Login user
- `cy.createUser(userData)`: Create test user
- `cy.fillForm(formData)`: Fill form fields
- `cy.checkToast(message, type)`: Verify toast notifications

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run test:e2e
```

## Debugging Tests

### Jest Debugging
```bash
# Run tests in debug mode
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Run single test file
npm test -- validation.test.js --verbose
```

### Cypress Debugging
- Use `cy.debug()` to pause execution
- Use `cy.pause()` to step through commands
- Check Cypress Command Log for details
- Screenshots on failure in `cypress/screenshots/`

## Test Maintenance

### Regular Tasks
1. Update test data regularly
2. Review and update test coverage
3. Remove obsolete tests
4. Update test documentation

### Adding New Tests
1. Write test before implementation (TDD)
2. Follow existing patterns
3. Add meaningful descriptions
4. Update this documentation

## Performance Testing

### Load Testing
```javascript
test('should handle concurrent requests', async () => {
  const promises = Array(100).fill().map(() => 
    request(app).get('/api/users')
  );
  const responses = await Promise.all(promises);
  responses.forEach(res => expect(res.status).toBe(200));
});
```

### Response Time Testing
```javascript
test('should respond quickly', async () => {
  const start = Date.now();
  await request(app).get('/api/users');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(100);
});
```

## Security Testing

### Input Validation
- Test SQL injection attempts
- Test XSS attempts
- Test authentication bypass
- Test authorization checks

### Example Security Test
```javascript
test('should prevent SQL injection', async () => {
  const maliciousInput = "'; DROP TABLE users; --";
  const response = await request(app)
    .post('/api/users')
    .send({ email: maliciousInput, name: 'Test' });
  expect(response.status).toBe(400);
});
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout: `jest.setTimeout(30000)`
   - Check for unresolved promises

2. **Flaky tests**
   - Add proper waits for async operations
   - Clean up test data properly
   - Check for race conditions

3. **Coverage gaps**
   - Check coverage report for untested lines
   - Add tests for edge cases
   - Test error scenarios

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)