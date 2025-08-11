// Integration tests for API endpoints
const request = require('supertest');
const app = require('../../src/server');

describe('API Integration Tests', () => {
  
  describe('Health Check', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('User API Endpoints', () => {
    // Clean up users before each test
    beforeEach(async () => {
      // Clear all users by getting them and deleting each
      const response = await request(app).get('/api/users');
      for (const user of response.body) {
        await request(app).delete(`/api/users/${user.id}`);
      }
    });

    describe('GET /api/users', () => {
      test('should return empty array when no users exist', async () => {
        const response = await request(app)
          .get('/api/users')
          .expect(200);
        
        expect(response.body).toEqual([]);
      });

      test('should return all users', async () => {
        // Create test users
        await request(app)
          .post('/api/users')
          .send({ email: 'user1@example.com', name: 'User One' });
        
        await request(app)
          .post('/api/users')
          .send({ email: 'user2@example.com', name: 'User Two' });
        
        const response = await request(app)
          .get('/api/users')
          .expect(200);
        
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('email', 'user1@example.com');
        expect(response.body[1]).toHaveProperty('email', 'user2@example.com');
      });

      test('should search users by query parameter', async () => {
        // Create test users
        await request(app)
          .post('/api/users')
          .send({ email: 'john@example.com', name: 'John Doe' });
        
        await request(app)
          .post('/api/users')
          .send({ email: 'jane@example.com', name: 'Jane Smith' });
        
        const response = await request(app)
          .get('/api/users?search=john')
          .expect(200);
        
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('name', 'John Doe');
      });
    });

    describe('GET /api/users/:id', () => {
      test('should return user by ID', async () => {
        const createResponse = await request(app)
          .post('/api/users')
          .send({ email: 'john@example.com', name: 'John Doe' });
        
        const userId = createResponse.body.id;
        
        const response = await request(app)
          .get(`/api/users/${userId}`)
          .expect(200);
        
        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('email', 'john@example.com');
        expect(response.body).toHaveProperty('name', 'John Doe');
      });

      test('should return 404 for non-existent user', async () => {
        const response = await request(app)
          .get('/api/users/9999')
          .expect(404);
        
        expect(response.body).toHaveProperty('error', 'User not found');
      });
    });

    describe('POST /api/users', () => {
      test('should create a new user with valid data', async () => {
        const userData = {
          email: 'john@example.com',
          name: 'John Doe',
          age: 30
        };
        
        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(201);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('name', userData.name);
        expect(response.body).toHaveProperty('age', userData.age);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
      });

      test('should return 400 for missing required fields', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({ email: 'john@example.com' })
          .expect(400);
        
        expect(response.body).toHaveProperty('error', 'Email and name are required');
      });

      test('should return 400 for invalid email format', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({ email: 'invalid-email', name: 'John Doe' })
          .expect(400);
        
        expect(response.body).toHaveProperty('error', 'Invalid email format');
      });

      test('should return 409 for duplicate email', async () => {
        const userData = {
          email: 'john@example.com',
          name: 'John Doe'
        };
        
        await request(app)
          .post('/api/users')
          .send(userData)
          .expect(201);
        
        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(409);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('already exists');
      });
    });

    describe('PUT /api/users/:id', () => {
      test('should update an existing user', async () => {
        const createResponse = await request(app)
          .post('/api/users')
          .send({ email: 'john@example.com', name: 'John Doe', age: 30 });
        
        const userId = createResponse.body.id;
        
        const response = await request(app)
          .put(`/api/users/${userId}`)
          .send({ name: 'John Smith', age: 31 })
          .expect(200);
        
        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('name', 'John Smith');
        expect(response.body).toHaveProperty('age', 31);
        expect(response.body).toHaveProperty('email', 'john@example.com');
      });

      test('should return 404 for non-existent user', async () => {
        const response = await request(app)
          .put('/api/users/9999')
          .send({ name: 'New Name' })
          .expect(404);
        
        expect(response.body).toHaveProperty('error', 'User not found');
      });

      test('should allow partial updates', async () => {
        const createResponse = await request(app)
          .post('/api/users')
          .send({ 
            email: 'john@example.com', 
            name: 'John Doe', 
            age: 30,
            city: 'New York'
          });
        
        const userId = createResponse.body.id;
        
        const response = await request(app)
          .put(`/api/users/${userId}`)
          .send({ age: 31 })
          .expect(200);
        
        expect(response.body).toHaveProperty('age', 31);
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('city', 'New York');
      });
    });

    describe('DELETE /api/users/:id', () => {
      test('should delete an existing user', async () => {
        const createResponse = await request(app)
          .post('/api/users')
          .send({ email: 'john@example.com', name: 'John Doe' });
        
        const userId = createResponse.body.id;
        
        await request(app)
          .delete(`/api/users/${userId}`)
          .expect(204);
        
        // Verify user is deleted
        await request(app)
          .get(`/api/users/${userId}`)
          .expect(404);
      });

      test('should return 404 for non-existent user', async () => {
        const response = await request(app)
          .delete('/api/users/9999')
          .expect(404);
        
        expect(response.body).toHaveProperty('error', 'User not found');
      });
    });
  });

  describe('Authentication Endpoints', () => {
    describe('POST /api/auth/login', () => {
      test('should login with valid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'admin@example.com',
            password: 'admin123'
          })
          .expect(200);
        
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email', 'admin@example.com');
        expect(response.body.user).toHaveProperty('role', 'admin');
      });

      test('should return 401 for invalid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'admin@example.com',
            password: 'wrongpassword'
          })
          .expect(401);
        
        expect(response.body).toHaveProperty('error', 'Invalid credentials');
      });

      test('should return 400 for missing credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'admin@example.com' })
          .expect(400);
        
        expect(response.body).toHaveProperty('error', 'Email and password are required');
      });
    });

    describe('POST /api/auth/logout', () => {
      test('should logout successfully', async () => {
        const response = await request(app)
          .post('/api/auth/logout')
          .expect(200);
        
        expect(response.body).toHaveProperty('message', 'Logged out successfully');
      });
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown-route')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Route not found');
    });

    test('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle user lifecycle (CRUD operations)', async () => {
      // Create
      const createResponse = await request(app)
        .post('/api/users')
        .send({ email: 'lifecycle@example.com', name: 'Test User' })
        .expect(201);
      
      const userId = createResponse.body.id;
      
      // Read
      const getResponse = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);
      
      expect(getResponse.body.email).toBe('lifecycle@example.com');
      
      // Update
      const updateResponse = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: 'Updated User' })
        .expect(200);
      
      expect(updateResponse.body.name).toBe('Updated User');
      
      // Delete
      await request(app)
        .delete(`/api/users/${userId}`)
        .expect(204);
      
      // Verify deletion
      await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);
    });

    test('should handle multiple concurrent requests', async () => {
      const promises = [];
      
      // Create multiple users concurrently
      for (let i = 1; i <= 5; i++) {
        promises.push(
          request(app)
            .post('/api/users')
            .send({ email: `user${i}@example.com`, name: `User ${i}` })
        );
      }
      
      const responses = await Promise.all(promises);
      
      responses.forEach((response, index) => {
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(`user${index + 1}@example.com`);
      });
      
      // Verify all users were created
      const getAllResponse = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(getAllResponse.body).toHaveLength(5);
    });
  });
});