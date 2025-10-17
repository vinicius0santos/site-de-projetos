const db = require('../db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS section (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    updated_at INTEGER NOT NULL,
    _order INTEGER NOT NULL,
    is_deleted INTEGER NOT NULL DEFAULT 0,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
  );
`).run();

class Section {
  static getAll(projectId) {
    const query = db.prepare(`SELECT * FROM section WHERE project_id = ?`);
    return query.all(projectId);
  }

  static getLatestSections(lastSectionDate, projectId) {
    const query = db.prepare(`SELECT * FROM section WHERE updated_at > ? AND project_id = ?`);
    return query.all(lastSectionDate, projectId);
  }

  static create(title, projectId) {
    const query = db.prepare(`
      INSERT INTO section(title, project_id, updated_at, _order)
      VALUES (?, ?, ?, ?)
    `);
    return query.run(title, projectId, Date.now(), Date.now());
  }

  static rename(sectionId, newTitle) {
    const query = db.prepare(
      `UPDATE section SET title = ?, updated_at = ? WHERE id = ?`
    );
    return query.run(newTitle, Date.now(), sectionId);
  }

  static delete(sectionId) {
    const query = db.prepare(
      `UPDATE section SET is_deleted = 1, updated_at = ? WHERE id = ? `
    );
    return query.run(Date.now(), sectionId);
  }

  static move(sectionId, nextItemOrder) {
    const query = db.prepare(
      `UPDATE section SET _order = ?, updated_at = ? WHERE id = ?`
    );
    return query.run(nextItemOrder - 1, Date.now(), sectionId);
  }
}

module.exports = Section;
