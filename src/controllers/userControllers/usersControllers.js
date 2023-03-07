// const { pool } = require('../../../db/connections');
const User = require('../../models/user');
// const logger = require('../../utils/logger/logger');
const { readRows, createRow, updateRow, deleteRow } = require('../../utils/queryFunctions/queryHelperFunctions');


let table = process.env.USERS_TABLE;



const userController = () => {

const getAllUserAccounts = async (req, res) => {
  try {
    const allUsers = await readRows(table);
    res.status(200).send(allUsers);
  } catch (error) {
    res.send(error)
  }
}; 

// Get a single user account by id
const getUserAccountById = async (req, res) => {
  const idParam = req.params.id
  try {
    const users = await readRows(table, "WHERE id = $1", [Number(idParam)]);
    if (users.length === 0) {
      throw new Error(`User with ID ${idParam} not found`);
    }
    res.status(200).send(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


// Create a new user account
const createUserAccount = async (req, res) => {
  const user = new User({first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password_hash: 'password123'} )
  if (!newUser.isValid()) {
    // If the user object is not valid, return an error response to the client
    // return res.status(400).json({ error: error });
    return res.status(400).json({ error: 'Invalid user data' });
  }
  try {
    const result = await createRow(table, user);
    res.status(201).send(result);
  } catch (error) {
    res.send(error)
  }
};

// Update an existing user account by id
const updateUserAccountById = async (req, res) => {
  // const id = req.params.id;
  const id = 2;
  const data = req.body;
  try {
    await updateRow(table, id, data );
    res.status(200).json({ message: `User account with ID ${id} updated successfully.` });
  } catch (err) {
    console.error(err);
    res.status(400).send(err)
  }
};

// Delete an existing user account by id
const deleteUserAccountById = async (req, res) => {
  const { id } = req.params;
  console.log("ID ", id)
  try {
    await deleteRow(table, id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete user account.' });
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