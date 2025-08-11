// Unit tests for validation utilities
const {
  isValidEmail,
  validatePassword,
  isValidPhone,
  isValidURL
} = require('../../src/utils/validation');

describe('Validation Utilities', () => {
  
  describe('isValidEmail', () => {
    // Positive test cases
    test('should return true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@gmail.com')).toBe(true);
      expect(isValidEmail('admin123@test-domain.org')).toBe(true);
    });

    // Negative test cases
    test('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
      expect(isValidEmail('user@example')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });

    // Edge cases
    test('should handle edge cases', () => {
      expect(isValidEmail('a@b.c')).toBe(true);
      expect(isValidEmail('user@localhost.localdomain')).toBe(true);
      expect(isValidEmail('user..name@example.com')).toBe(true);
    });
  });

  describe('validatePassword', () => {
    // Strong password tests
    test('should validate strong passwords', () => {
      const result = validatePassword('StrongP@ss123');
      expect(result.valid).toBe(true);
      expect(result.strength).toBe('strong');
      expect(result.errors).toHaveLength(0);
    });

    test('should accept passwords with all requirements', () => {
      const passwords = [
        'MyP@ssw0rd',
        'Secure123!',
        'TestP@ss99',
        'Admin$2024'
      ];
      
      passwords.forEach(password => {
        const result = validatePassword(password);
        expect(result.valid).toBe(true);
        expect(result.strength).toBe('strong');
      });
    });

    // Weak password tests
    test('should reject passwords missing requirements', () => {
      const testCases = [
        {
          password: 'short',
          expectedErrors: [
            'Password must be at least 8 characters long',
            'Password must contain at least one uppercase letter',
            'Password must contain at least one number',
            'Password must contain at least one special character'
          ]
        },
        {
          password: 'nouppercase123!',
          expectedErrors: [
            'Password must contain at least one uppercase letter'
          ]
        },
        {
          password: 'NOLOWERCASE123!',
          expectedErrors: [
            'Password must contain at least one lowercase letter'
          ]
        },
        {
          password: 'NoNumbers!',
          expectedErrors: [
            'Password must contain at least one number'
          ]
        },
        {
          password: 'NoSpecialChar123',
          expectedErrors: [
            'Password must contain at least one special character'
          ]
        }
      ];

      testCases.forEach(({ password, expectedErrors }) => {
        const result = validatePassword(password);
        expect(result.valid).toBe(false);
        expect(result.errors).toEqual(expect.arrayContaining(expectedErrors));
      });
    });

    // Medium strength tests
    test('should identify medium strength passwords', () => {
      const result = validatePassword('Password123'); // Missing special char
      expect(result.valid).toBe(false);
      expect(result.strength).toBe('medium');
      expect(result.errors).toHaveLength(1);
    });

    // Edge cases
    test('should handle edge cases', () => {
      expect(validatePassword('').valid).toBe(false);
      expect(validatePassword(null).valid).toBe(false);
      expect(validatePassword(undefined).valid).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    // Valid phone number formats
    test('should return true for valid phone numbers', () => {
      const validNumbers = [
        '1234567890',
        '123-456-7890',
        '(123) 456-7890',
        '123.456.7890',
        '+1234567890',
        '123 456 7890'
      ];

      validNumbers.forEach(phone => {
        expect(isValidPhone(phone)).toBe(true);
      });
    });

    // Invalid phone number formats
    test('should return false for invalid phone numbers', () => {
      const invalidNumbers = [
        '123',
        'abcdefghij',
        '123-45-6789',
        '12 34 56 78 90',
        '',
        '123-456-789'
      ];

      invalidNumbers.forEach(phone => {
        expect(isValidPhone(phone)).toBe(false);
      });
    });

    // International formats
    test('should handle international formats', () => {
      expect(isValidPhone('+12125551234')).toBe(true);
      expect(isValidPhone('+442012341234')).toBe(true);
    });
  });

  describe('isValidURL', () => {
    // Valid URLs
    test('should return true for valid URLs', () => {
      const validURLs = [
        'https://www.example.com',
        'http://localhost:3000',
        'ftp://files.example.com',
        'https://api.example.com/v1/users',
        'https://example.com?query=test',
        'https://example.com#section'
      ];

      validURLs.forEach(url => {
        expect(isValidURL(url)).toBe(true);
      });
    });

    // Invalid URLs
    test('should return false for invalid URLs', () => {
      const invalidURLs = [
        'not a url',
        'example.com',
        'http://',
        '//example.com',
        'htp://example.com',
        ''
      ];

      invalidURLs.forEach(url => {
        expect(isValidURL(url)).toBe(false);
      });
    });

    // Edge cases
    test('should handle edge cases', () => {
      expect(isValidURL('file:///path/to/file')).toBe(true);
      expect(isValidURL('mailto:user@example.com')).toBe(true);
      expect(isValidURL('data:text/plain;base64,SGVsbG8=')).toBe(true);
    });
  });
});