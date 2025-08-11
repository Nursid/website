// User Service

class UserService {
  constructor() {
    // In-memory storage for demo purposes
    this.users = [];
    this.nextId = 1;
  }

  /**
   * Creates a new user
   * @param {object} userData - User data
   * @returns {object} - Created user
   */
  async createUser(userData) {
    if (!userData.email || !userData.name) {
      throw new Error('Email and name are required');
    }

    // Check if user already exists
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Gets a user by ID
   * @param {number} id - User ID
   * @returns {object|null} - User object or null if not found
   */
  async getUserById(id) {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  /**
   * Gets a user by email
   * @param {string} email - User email
   * @returns {object|null} - User object or null if not found
   */
  async getUserByEmail(email) {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  /**
   * Updates a user
   * @param {number} id - User ID
   * @param {object} updates - Updates to apply
   * @returns {object} - Updated user
   */
  async updateUser(id, updates) {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Don't allow updating ID
    delete updates.id;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.users[userIndex];
  }

  /**
   * Deletes a user
   * @param {number} id - User ID
   * @returns {boolean} - True if deleted successfully
   */
  async deleteUser(id) {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  /**
   * Gets all users
   * @returns {array} - Array of all users
   */
  async getAllUsers() {
    return [...this.users];
  }

  /**
   * Searches users by name
   * @param {string} query - Search query
   * @returns {array} - Array of matching users
   */
  async searchUsers(query) {
    if (!query) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return this.users.filter(u => 
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Clears all users (useful for testing)
   */
  clearUsers() {
    this.users = [];
    this.nextId = 1;
  }
}

module.exports = UserService;