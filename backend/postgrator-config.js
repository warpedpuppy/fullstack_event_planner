require('dotenv').config();

let obj = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URL
    : process.env.DATABASE_URL,
}

module.exports = obj;
