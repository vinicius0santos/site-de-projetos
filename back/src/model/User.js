const db = require('../db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`).run();

class User {
  static create(username, password) {
    const query = db.prepare(`
      INSERT INTO user (username, password, created_at)
      VALUES (?, ?, ?)
    `);
    return query.run(username, password, Date.now());
  }

  static get(username) {
    const query = db.prepare(`
      SELECT * FROM user WHERE username = ?
    `);

    return query.get(username);
  }
}

module.exports = User;
