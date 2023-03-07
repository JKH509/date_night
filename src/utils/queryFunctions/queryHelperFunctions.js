const { pool } = require('../../../db/connections');
const { logger } = require('../logger/logger')

const executeQuery = async (query, params) => {
  try {
    // Create a connection pool
    const client = await pool.connect();
    const result = await client.query(query, params);
    // End connection pool once you get the results back
    client.release();
    return result;
  } catch (err) {
    console.error(err);
    logger.error(err);
    throw new Error('Database query failed');
  }
}

const isValidTableName = (table) => {
  // Check that `table` is a string and matches a pattern for valid table names
  return typeof table === 'string' && /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)?$/.test(table);
}

const isValidSqlWhereClause = (whereClause) => {
  const pattern = /^(?:WHERE\s+\w+\s*(?:=|>|<|\>=|\<=|\!=)\s*\$\d+\s*(?:AND|OR)?\s*)*$/i;
  return typeof whereClause === 'string' && pattern.test(whereClause);
}


const createRow = async (table, data) => {
  if (!isValidTableName(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = Array.from(Array(values.length), (_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING id`;
  const result = await executeQuery(query, values);
  return result.rows[0].id;
}

const readRows = async (table, whereClause  , params = []) => {
  if (!isValidTableName(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }
  if (whereClause && !isValidSqlWhereClause(whereClause)) {
    throw new Error(`Invalid WHERE clause: ${whereClause}`);
  }
  const query = `SELECT * FROM ${table} ${whereClause ? whereClause : ''}`;
  const result = await executeQuery(query, params);
  return result.rows;
} 

const readRowsOfCountOrSum = async (table, CountOrSum, whereClause  , params = []) => {
  if (!isValidTableName(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }
  if (whereClause && !isValidSqlWhereClause(whereClause)) {
    throw new Error(`Invalid WHERE clause: ${whereClause}`);
  }
  const query = `SELECT ${CountOrSum}(*) FROM ${table} ${whereClause ? whereClause : ''}`;
  const result = await executeQuery(query, params);
  return result.rows;
} 

const updateRow = async (table, id, data) => {
  if (!isValidTableName(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map((c, i) => `${c} = $${i + 2}`).join(', ');
  const query = `UPDATE ${table} SET ${placeholders} WHERE id = $1`;
  // console.log("query ", query, "ID ",id, " values ", ...values)
  await executeQuery(query, [id, ...values]);
}

const deleteRow = async (table, id) => {
  if (!isValidTableName(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }
  const query = `DELETE FROM ${table} WHERE id = $1`;
  console.log("QUERY ", query, " id ", id)
  // await executeQuery(query, [id]);
}

module.exports = {
  createRow,
  readRowsOfCountOrSum,
  readRows,
  updateRow,
  deleteRow
};