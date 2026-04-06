const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Product Routes', () => {
  let adminToken;

  beforeAll(async () => {
    // Create an admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });

    adminToken = loginRes.body.token;
  });

  describe('GET /api/products', () => {
    it('should fetch products', async () => {
      const response = await request(app)
        .get('/api/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('should create a product (admin only)', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Product',
          description: 'A test product',
          price: 99.99,
          stock: 10,
          category: 'Electronics'
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Product');
    });

    it('should reject non-admin users', async () => {
      const userRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Regular User',
          email: 'user@example.com',
          password: 'password123'
        });

      const userToken = userRes.body.token;

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Product',
          description: 'A test product',
          price: 99.99,
          stock: 10,
          category: 'Electronics'
        });

      expect(response.status).toBe(403);
    });
  });
});
