import db from "../config/db.js";

const Usuario = {

  async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    return rows.length ? rows[0] : null;
  },

  async create({ nombre, username, password }) {
    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, username, password)
       VALUES (?, ?, ?)`,
      [nombre, username, password]
    );
    return result.insertId;
  }

};

export default Usuario;
