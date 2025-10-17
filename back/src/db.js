const Database = require('better-sqlite3');

const db = new Database('./database.sqlite', {
  verbose: console.log,
});
db.pragma('foreign_keys = ON');

module.exports = db;