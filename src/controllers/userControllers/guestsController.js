const Guest = require('../../models/guest');
const { readRows, createRow, updateRow, deleteRow } = require('../../utils/queryFunctions/queryHelperFunctions');

let table = process.env.GUEST_USERS_TABLE;


const guestsController = () => {

const getAllGuestUserAccounts = async (req, res) => {
  try {
    const allGuestUsers = await readRows(table);
    res.status(200).send(allGuestUsers);
  } catch (error) {
    res.send(error)
  }
}; 

// Get a single guest account by id
const getGuestUserAccountById = async (req, res) => {
  const idParam = req.params.id
  try {
    const guests = await readRows(table, "WHERE id = $1", [Number(idParam)]);
    if (guests.length === 0) {
      throw new Error(`User with ID ${idParam} not found`);
    }
    res.status(200).send(guests[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Create a new guest account
const createGuestUserAccount = async (req, res) => {
  // need to check that shared password value, and shared password ID are valid for this guest before continueing
  const guest = new Guest({first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com'} )
  if (!newGuest.isValid()) {
    // If the guest object is not valid, return an error response to the client
    // return res.status(400).json({ error: error });
    return res.status(400).json({ error: 'Invalid guest data' });
  }
  try {
    const result = await createRow(table, guest);
    res.status(201).send(result);
  } catch (error) {
    res.send(error)
  }
};

// Update an existing guest account by id
const updateGuestUserAccountById = async (req, res) => {
  // const id = req.params.id;
  const id = 2;
  const data = req.body;
  try {
    await updateRow(table, id, data );
    res.status(200).json({ message: `Guest account with ID ${id} updated successfully.` });
  } catch (err) {
    console.error(err);
    res.status(400).send(err)
  }
};

// Delete an existing guest account by id
const deleteGuestUserAccountById = async (req, res) => {
  const { id } = req.params;
  console.log("ID ", id)
  try {
    await deleteRow(table, id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete guest account.' });
  }
};

return {
  getAllGuestUserAccounts,
  getGuestUserAccountById,
  createGuestUserAccount,
  updateGuestUserAccountById,
  deleteGuestUserAccountById
}
}
module.exports = guestsController; 