// const {pool} = require('../../../db/connections');
const { readRowsOfCountOrSum, createRow } = require("../queryFunctions/queryHelperFunctions");
let table = process.env.CHARACTER_PASSWORD_TABLE;

const createSixCharacterRandomPassword = async () => {
  let password = '';
  const length = 6;
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  while (true) {
    // generate a new password until a unique one is found
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    // query the database to check if the password already exists
    // const client = await pool.connect();
    try {
      const res = await readRowsOfCountOrSum(table, 'COUNT', "WHERE value = $1", [password])
      // const res = await client.query('SELECT COUNT(*) FROM passwords WHERE value = $1', [password]);
      if (res.rows[0].count === '0') {
        // the password does not exist in the database, so we can use it
        let data ={value: password}
        await createRow(table, data)
        // await client.query('INSERT INTO passwords (value) VALUES ($1)', [password]);
        return password;
      }
    } finally {
      // client.release();
    }
  }

}

module.exports = createSixCharacterRandomPassword;