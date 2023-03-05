const { pool } = require('../../../db/connections');

// Create a connection pool

const userController = () => {
// Get all user accounts
const getAllUserAccounts = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
    SELECT * FROM date_night.user_accounts
    `);
    console.log("result.rows ", result.rows)
    // res.status(200).json(result.rows);
    res.status(200).send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}; 

// Get a single user account by id
const getUserAccountById = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM user_accounts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send('User account not found');
    }
    res.status(200).json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Create a new user account
const createUserAccount = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO user_accounts (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, password]);
    res.status(201).json({ id: result.rows[0].id });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update an existing user account by id
const updateUserAccountById = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE user_accounts SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5', [first_name, last_name, email, password, req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).send('User account not found');
    }
    res.status(204).send();
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete an existing user account by id
const deleteUserAccountById = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM user_accounts WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).send('User account not found');
    }
    res.status(204).send();
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }

};

return {
  getAllUserAccounts,
  getUserAccountById,
  createUserAccount,
  updateUserAccountById,
  deleteUserAccountById
}
}
module.exports = userController; 