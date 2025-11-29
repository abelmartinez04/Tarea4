import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Login
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// Registro
router.get("/register", authController.showRegister);
router.post("/register", authController.register);

// Logout
router.get("/logout", authController.logout);

export default router;
