const db = require('../db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    posted_by TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
  );
`).run();

class Comment {
  static getLatestComments(lastCommentId) {
    const query = db.prepare(`SELECT * FROM comment WHERE id > ?`);
    return query.all(lastCommentId);
  }

  static getLatest50() {
    const query = db.prepare(`SELECT * FROM comment ORDER BY id DESC LIMIT 50`);
    return query.all();
  }

  static post(message, postedBy, userId) {
    const query = db.prepare(
      `INSERT INTO comment(message, posted_by, user_id, created_at)
      VALUES (?, ?, ?, ?)
    `);
    return query.run(message, postedBy, userId, Date.now());
  }
}

module.exports = Comment;
