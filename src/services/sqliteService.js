import * as SQLite from 'expo-sqlite';

// Abrir o crear la base de datos
const db = SQLite.openDatabaseSync('gestion_tiempo.db');

// Crear tabla si no existe
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

// Insertar o actualizar una tarea
const upsertTask = (id, { titulo, descripcion, fecha, completado = 0 }) => {
  if (id) {
    // Actualiza si existe
    db.runSync(
      `UPDATE tasks SET titulo = ?, descripcion = ?, fecha = ?, completado = ? WHERE id = ?;`,
      [titulo, descripcion, fecha, completado, id]
    );
  } else {
    // Inserta nueva
    db.runSync(
      `INSERT INTO tasks (titulo, descripcion, fecha, completado) VALUES (?,?,?,?);`,
      [titulo, descripcion, fecha, completado]
    );
  }
};

// Obtener todas las tareas
const getAllTasks = () => {
  const result = db.getAllSync(`SELECT * FROM tasks ORDER BY fecha ASC;`);
  return result;
};

// Eliminar una tarea
const deleteTaskById = (id) => {
  db.runSync(`DELETE FROM tasks WHERE id = ?;`, [id]);
};

// Marcar tarea como completada
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
