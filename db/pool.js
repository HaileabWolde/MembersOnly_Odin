require("dotenv").config();
const pg = require('pg');

module.exports = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database:  process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT// The default port
    // Insert pool options here
});


   
