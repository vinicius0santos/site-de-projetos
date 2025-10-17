const db = require('../db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image BLOB,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
  );
`).run();

class Project {
  static getAll() {
    const query = db.prepare(`SELECT * FROM project`);
    return query.all();
  }

  static create(name, slug, image, userId) {
    const query = db.prepare(
      `INSERT INTO project(name, slug, image, user_id, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    return query.run(name, slug, image, userId, Date.now());
  }

  static delete(id) {
    const query = db.prepare(`DELETE FROM project WHERE id = ?`);
    return query.run(id);
  }

  static getBySlug(slug) {
    const query = db.prepare(`SELECT * FROM project WHERE slug = ?`);
    return query.get(slug);
  }
}

module.exports = Project;
