// Unit tests for UserService
const UserService = require('../../src/services/userService');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    userService.clearUsers();
  });

  describe('createUser', () => {
    test('should create a new user with valid data', async () => {
      const userData = {
        email: 'john@example.com',
        name: 'John Doe',
        age: 30
      };

      const user = await userService.createUser(userData);

      expect(user).toMatchObject({
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
        age: 30
      });
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    test('should auto-increment user IDs', async () => {
      const user1 = await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });
      const user2 = await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });

    test('should throw error when email is missing', async () => {
      const userData = { name: 'John Doe' };

      await expect(userService.createUser(userData))
        .rejects.toThrow('Email and name are required');
    });

    test('should throw error when name is missing', async () => {
      const userData = { email: 'john@example.com' };

      await expect(userService.createUser(userData))
        .rejects.toThrow('Email and name are required');
    });

    test('should throw error for duplicate email', async () => {
      const userData = {
        email: 'john@example.com',
        name: 'John Doe'
      };

      await userService.createUser(userData);

      await expect(userService.createUser(userData))
        .rejects.toThrow('User with this email already exists');
    });

    test('should preserve additional user properties', async () => {
      const userData = {
        email: 'john@example.com',
        name: 'John Doe',
        phone: '123-456-7890',
        address: '123 Main St'
      };

      const user = await userService.createUser(userData);

      expect(user.phone).toBe('123-456-7890');
      expect(user.address).toBe('123 Main St');
    });
  });

  describe('getUserById', () => {
    test('should return user when ID exists', async () => {
      const createdUser = await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const foundUser = await userService.getUserById(1);

      expect(foundUser).toEqual(createdUser);
    });

    test('should return null when ID does not exist', async () => {
      const user = await userService.getUserById(999);
      expect(user).toBeNull();
    });

    test('should handle multiple users correctly', async () => {
      await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });
      const user2 = await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      const foundUser = await userService.getUserById(2);
      expect(foundUser).toEqual(user2);
    });
  });

  describe('getUserByEmail', () => {
    test('should return user when email exists', async () => {
      const createdUser = await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const foundUser = await userService.getUserByEmail('john@example.com');

      expect(foundUser).toEqual(createdUser);
    });

    test('should return null when email does not exist', async () => {
      const user = await userService.getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });

    test('should be case-sensitive for email matching', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const user = await userService.getUserByEmail('JOHN@EXAMPLE.COM');
      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    test('should update existing user', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe',
        age: 30
      });

      const updatedUser = await userService.updateUser(1, {
        name: 'John Smith',
        age: 31
      });

      expect(updatedUser.name).toBe('John Smith');
      expect(updatedUser.age).toBe(31);
      expect(updatedUser.email).toBe('john@example.com'); // Unchanged
    });

    test('should update updatedAt timestamp', async () => {
      const createdUser = await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10));

      const updatedUser = await userService.updateUser(1, {
        name: 'John Smith'
      });

      expect(updatedUser.updatedAt).not.toBe(createdUser.updatedAt);
    });

    test('should not allow updating user ID', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const updatedUser = await userService.updateUser(1, {
        id: 999,
        name: 'John Smith'
      });

      expect(updatedUser.id).toBe(1); // ID should remain unchanged
    });

    test('should throw error when user does not exist', async () => {
      await expect(userService.updateUser(999, { name: 'New Name' }))
        .rejects.toThrow('User not found');
    });

    test('should allow partial updates', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York'
      });

      const updatedUser = await userService.updateUser(1, {
        age: 31
      });

      expect(updatedUser.age).toBe(31);
      expect(updatedUser.name).toBe('John Doe');
      expect(updatedUser.city).toBe('New York');
    });
  });

  describe('deleteUser', () => {
    test('should delete existing user', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const result = await userService.deleteUser(1);
      expect(result).toBe(true);

      const user = await userService.getUserById(1);
      expect(user).toBeNull();
    });

    test('should throw error when user does not exist', async () => {
      await expect(userService.deleteUser(999))
        .rejects.toThrow('User not found');
    });

    test('should handle multiple deletions correctly', async () => {
      await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });
      await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      await userService.deleteUser(1);

      const user1 = await userService.getUserById(1);
      const user2 = await userService.getUserById(2);

      expect(user1).toBeNull();
      expect(user2).toBeDefined();
    });
  });

  describe('getAllUsers', () => {
    test('should return empty array when no users exist', async () => {
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    test('should return all users', async () => {
      const user1 = await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });
      const user2 = await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      const users = await userService.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users).toContainEqual(user1);
      expect(users).toContainEqual(user2);
    });

    test('should return a copy of users array', async () => {
      await userService.createUser({
        email: 'john@example.com',
        name: 'John Doe'
      });

      const users1 = await userService.getAllUsers();
      const users2 = await userService.getAllUsers();

      expect(users1).not.toBe(users2); // Different array references
      expect(users1).toEqual(users2); // Same content
    });
  });

  describe('searchUsers', () => {
    beforeEach(async () => {
      await userService.createUser({
        email: 'john.doe@example.com',
        name: 'John Doe'
      });
      await userService.createUser({
        email: 'jane.smith@example.com',
        name: 'Jane Smith'
      });
      await userService.createUser({
        email: 'bob.johnson@example.com',
        name: 'Bob Johnson'
      });
    });

    test('should find users by name', async () => {
      const results = await userService.searchUsers('john');

      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('John Doe');
      expect(results[1].name).toBe('Bob Johnson');
    });

    test('should find users by email', async () => {
      const results = await userService.searchUsers('smith');

      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Jane Smith');
    });

    test('should be case-insensitive', async () => {
      const results = await userService.searchUsers('JOHN');

      expect(results).toHaveLength(2);
    });

    test('should return empty array for no matches', async () => {
      const results = await userService.searchUsers('nonexistent');

      expect(results).toEqual([]);
    });

    test('should return empty array for empty query', async () => {
      const results = await userService.searchUsers('');

      expect(results).toEqual([]);
    });

    test('should return empty array for null query', async () => {
      const results = await userService.searchUsers(null);

      expect(results).toEqual([]);
    });
  });

  describe('clearUsers', () => {
    test('should remove all users', async () => {
      await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });
      await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      userService.clearUsers();

      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    test('should reset ID counter', async () => {
      await userService.createUser({
        email: 'user1@example.com',
        name: 'User One'
      });

      userService.clearUsers();

      const newUser = await userService.createUser({
        email: 'user2@example.com',
        name: 'User Two'
      });

      expect(newUser.id).toBe(1);
    });
  });
});