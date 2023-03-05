// const { pool } = require('../../../db/connections');
// const logger = require('../../utils/logger/logger');
const { readRows, createRow, updateRow, deleteRow } = require('../../utils/queryFunctions/queryHelperFunctions');

let table = process.env.ADVERTISMENT_TABLE;

const advertiserController = () => {

const getAllAdvertiserAccounts = async (req, res) => {
  try {
    const allAdvertisers = await readRows(table);
    res.status(200).send(allAdvertisers);
  } catch (error) {
    res.send(error)
  }
}; 

// Get a single advertiser account by id
const getAdvertiserAccountById = async (req, res) => {
  const idParam = req.params.id
  try {
    const Advertisers = await readRows(table, "WHERE id = $1", [Number(idParam)]);
    if (Advertisers.length === 0) {
      throw new Error(`Advertiser with ID ${idParam} not found`);
    }
    res.status(200).send(Advertisers[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


// Create a new advertiser account
const createAdvertiserAccount = async (req, res) => {
  const data = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password_hash: 'password123' };
  try {
    const result = await createRow(table, data);
    res.status(201).send(result);
  } catch (error) {
    res.send(error)
  }
};

// Update an existing advertiser account by id
const updateAdvertiserAccountById = async (req, res) => {
  // const id = req.params.id;
  const id = 2;
  const data = req.body;
  try {
    await updateRow(table, id, data );
    res.status(200).json({ message: `Advertiser account with ID ${id} updated successfully.` });
  } catch (err) {
    console.error(err);
    res.status(400).send(err)
  }
};

// Delete an existing advertiser account by id
const deleteAdvertiserAccountById = async (req, res) => {
  const { id } = req.params;
  console.log("ID ", id)
  try {
    await deleteRow(table, id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete advertiser account.' });
  }
};

return {
  getAllAdvertiserAccounts,
  getAdvertiserAccountById,
  createAdvertiserAccount,
  updateAdvertiserAccountById,
  deleteAdvertiserAccountById
}
}
module.exports = advertiserController; 