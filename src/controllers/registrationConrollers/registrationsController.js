const { pool } = require('../../../db/connections');
const bcrypt = require('bcrypt');

// Create a connection pool

const registrationController = () => {

  const register = async (req, res) => {
    try {
      const client = await pool.connect();
      const { email, password } = req.body;
  
      // Check if email is already registered
      const emailCheckQuery = 'SELECT * FROM user_accounts WHERE email = $1';
      const emailCheckValues = [email];
      const emailCheckResult = await pool.query(emailCheckQuery, emailCheckValues);
  
      if (emailCheckResult.rowCount > 0) {
        return res.status(409).json({ error: 'Email is already registered' });
      }
   
      // Create hashed password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Insert new user account into database
      const insertUserQuery = 'INSERT INTO user_accounts (email, password) VALUES ($1, $2) RETURNING *';
      const insertUserValues = [email, hashedPassword];
      const insertUserResult = await pool.query(insertUserQuery, insertUserValues);
      client.release();
      res.status(201).json({ user: insertUserResult.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };



return {
  register
}
}
module.exports = registrationController; 