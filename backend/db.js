const { Pool } = require('pg');

const pool = new Pool(); // uses the PG* env vars

module.exports = pool;
