const pgPool = require("./pool")
const passport = require("passport");
const bcrypt = require("bcryptjs");


async function createUser(firstname, lastname, username, password){
  const hashedPassword = await bcrypt.hash(password,  10);
  const {rows} = await pgPool.query("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)", [firstname, lastname, username, hashedPassword]);
  return rows;

}

module.exports = {
    createUser
}

