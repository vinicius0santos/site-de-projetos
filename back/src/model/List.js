const db = require('../db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    updated_at INTEGER NOT NULL,
    _order INTEGER NOT NULL,
    is_deleted INTEGER NOT NULL DEFAULT 0,
    section_id INTEGER NOT NULL,
    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE
  );
`).run();

class List {
  static getAll(sectionId) {
    const query = db.prepare(`SELECT * FROM list WHERE section_id = ?`);
    return query.all(sectionId);
  }

  static getLatestLists(lastListDate, sectionId) {
    const query = db.prepare(`SELECT * FROM list WHERE updated_at > ? AND section_id = ?`);
    return query.all(lastListDate, sectionId);
  }

  static create(title, sectionId) {
    const query = db.prepare(`
      INSERT INTO list(title, section_id, updated_at, _order)
      VALUES (?, ?, ?, ?)
    `);
    return query.run(title, sectionId, Date.now(), Date.now());
  }

  static rename(listId, newTitle) {
    const query = db.prepare(
      `UPDATE list SET title = ?, updated_at = ? WHERE id = ?`
    );
    return query.run(newTitle, Date.now(), listId);
  }

  static delete(listId) {
    const query = db.prepare(
      `UPDATE list SET is_deleted = 1, updated_at = ? WHERE id = ? `
    );
    return query.run(Date.now(), listId);
  }

  static move(listId, nextItemOrder) {
    const query = db.prepare(
      `UPDATE list SET _order = ?, updated_at = ? WHERE id = ?`
    );
    return query.run(nextItemOrder - 1, Date.now(), listId);
  }
}

module.exports = List;
