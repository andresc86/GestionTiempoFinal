import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gestion_tiempo.db');

const init = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      fecha TEXT,
      completado INTEGER DEFAULT 0
    );
  `);
};

const upsertTask = (id, { titulo, descripcion, fecha, completado = 0 }) => {
  if (id) {
    db.runSync(
      `UPDATE tasks SET titulo = ?, descripcion = ?, fecha = ?, completado = ? WHERE id = ?;`,
      [titulo, descripcion, fecha, completado, id]
    );
  } else {
    db.runSync(
      `INSERT INTO tasks (titulo, descripcion, fecha, completado) VALUES (?,?,?,?);`,
      [titulo, descripcion, fecha, completado]
    );
  }
};

const getAllTasks = () => {
  const result = db.getAllSync(`SELECT * FROM tasks ORDER BY fecha ASC;`);
  return result;
};

const deleteTaskById = (id) => {
  db.runSync(`DELETE FROM tasks WHERE id = ?;`, [id]);
};

const completeTask = (id) => {
  db.runSync(`UPDATE tasks SET completado = 1 WHERE id = ?;`, [id]);
};

export default {
  init,
  upsertTask,
  getAllTasks,
  deleteTaskById,
  completeTask,
};
