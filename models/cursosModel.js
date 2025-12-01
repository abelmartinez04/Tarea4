import pool from "../config/db.js";

const Cursos = {

  findAll() {
    return pool.query("SELECT * FROM cursos ORDER BY id DESC");
  },

  findById(id) {
    return pool.query("SELECT * FROM cursos WHERE id = ?", [id]);
  },

  create(data) {
    const { nombre, duracion, instructor, precio } = data;
    return pool.query(
      "INSERT INTO cursos (nombre, duracion, instructor, precio) VALUES (?, ?, ?, ?)",
      [nombre, duracion, instructor, precio]
    );
  },

  update(id, data) {
    const { nombre, duracion, instructor, precio } = data;
    return pool.query(
      "UPDATE cursos SET nombre=?, duracion=?, instructor=?, precio=? WHERE id=?",
      [nombre, duracion, instructor, precio, id]
    );
  },

  delete(id) {
    return pool.query("DELETE FROM cursos WHERE id=?", [id]);
  }
};

export default Cursos;
