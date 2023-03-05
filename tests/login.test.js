const request = require('supertest');
const app = require('../app'); // assuming your app is defined in app.js
const pool = require('../db/connections'); // assuming your db connection pool is defined in db/connections.js

describe('POST /login', () => {
  beforeAll(async () => {
    // create a test user in the database for authentication
    const client = await pool.connect();
    await client.query('INSERT INTO user_accounts (username, password) VALUES ($1, $2)', ['testuser', 'testpassword']);
    client.release();
  });

  afterAll(async () => {
    // remove the test user from the database
    const client = await pool.connect();
    await client.query('DELETE FROM user_accounts WHERE username = $1', ['testuser']);
    client.release();
  });

  it('should respond with 200 status and auth token on successful login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200);
    expect(response.body.token).toBeDefined();
  });

  it('should respond with 401 status and error message on incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .expect(401);
    expect(response.body.error).toBe('Incorrect password');
  });

  it('should respond with 401 status and error message on non-existent user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'nonexistentuser', password: 'testpassword' })
      .expect(401);
    expect(response.body.error).toBe('User not found');
  });
});