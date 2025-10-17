const Database = require('better-sqlite3');

const db = new Database('./database.sqlite');
db.pragma('foreign_keys = ON');

module.exports = db;