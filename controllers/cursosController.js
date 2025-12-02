import Cursos from "../models/cursosModel.js";

const cursosController = {
  index(req, res) {
    res.render("cursos/index", {
      title: "Cursos",
      activePage: "cursos",
      usuario: req.session.user,
    });
  },

  async getCursos(req, res) {
    try {
      const [cursos] = await Cursos.findAll();
      res.json({ success: true, data: cursos });
    } catch (error) {
      console.error("Error obteniendo cursos:", error);
      res
        .status(500)
        .json({ success: false, error: "Error en la base de datos" });
    }
  },

  async getCurso(req, res) {
    try {
      const [rows] = await Cursos.findById(req.params.id);
      res.json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Error obteniendo curso:", error);
      res
        .status(500)
        .json({ success: false, error: "Error en la base de datos" });
    }
  },

  async createCurso(req, res) {
    try {
      const { nombre, duracion, instructor, precio } = req.body;

      // Validaciones
      if (!nombre || nombre.trim() === "") {
        return res.json({ success: false, error: "El nombre es obligatorio." });
      }

      if (!duracion || isNaN(duracion) || duracion <= 0) {
        return res.json({ success: false, error: "Duración inválida." });
      }

      if (!instructor || instructor.trim() === "") {
        return res.json({
          success: false,
          error: "El instructor es obligatorio.",
        });
      }

      if (!precio || isNaN(precio) || precio <= 0) {
        return res.json({
          success: false,
          error: "El precio debe ser un número válido.",
        });
      }

      await Cursos.create(req.body);
      res.json({ success: true, message: "Curso creado correctamente" });
    } catch (error) {
      console.error("Error creando curso:", error);
      res
        .status(500)
        .json({ success: false, error: "Error en la base de datos" });
    }
  },

  async updateCurso(req, res) {
    try {
      const { nombre, duracion, instructor, precio } = req.body;

      if (!nombre || nombre.trim() === "") {
        return res.json({ success: false, error: "El nombre es obligatorio." });
      }

      if (!duracion || isNaN(duracion) || duracion <= 0) {
        return res.json({ success: false, error: "Duración inválida." });
      }

      if (!instructor || instructor.trim() === "") {
        return res.json({
          success: false,
          error: "El instructor es obligatorio.",
        });
      }

      if (!precio || isNaN(precio) || precio <= 0) {
        return res.json({
          success: false,
          error: "El precio debe ser un número válido.",
        });
      }

      await Cursos.update(req.params.id, req.body);
      res.json({ success: true, message: "Curso actualizado correctamente" });
    } catch (error) {
      console.error("Error actualizando curso:", error);
      res
        .status(500)
        .json({ success: false, error: "Error en la base de datos" });
    }
  },
  async deleteCurso(req, res) {
    try {
      await Cursos.delete(req.params.id);
      res.json({ success: true, message: "Curso eliminado" });
    } catch (error) {
      console.error("Error eliminando curso:", error);
      res
        .status(500)
        .json({ success: false, error: "Error en la base de datos" });
    }
  },
};

export default cursosController;
