const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../../../db/connections');

const loginController = () => {

  const  login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const userQuery = 'SELECT * FROM user_accounts WHERE email = $1';
      const userValues = [email];
      const { rows } = await pool.query(userQuery, userValues);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = rows[0];
  
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.hashed_password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create and send JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  return {
    login
  }
}


module.exports =  loginController ;
