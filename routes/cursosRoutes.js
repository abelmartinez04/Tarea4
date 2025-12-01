import express from "express";
import cursosController from "../controllers/cursosController.js";

const router = express.Router();

router.get("/", cursosController.index);

router.get("/listar", cursosController.getCursos);
router.get("/buscar/:id", cursosController.getCurso);

router.post("/crear", cursosController.createCurso);
router.put("/editar/:id", cursosController.updateCurso);
router.delete("/eliminar/:id", cursosController.deleteCurso);

export default router;
