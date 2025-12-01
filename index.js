import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config({ path: "./config/.env" });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(
  session({
    secret: process.env.CLAVE_SESION || "clave_por_defecto",
    resave: false,
    saveUninitialized: false,
  })
);

// Importar rutas
import authRoutes from "./routes/authRoutes.js";
import cursosRoutes from "./routes/cursosRoutes.js";


// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}


// Registrar rutas
app.use("/", authRoutes);   
app.use("/cursos", requireLogin, cursosRoutes);

// Rutas principales
app.get("/", requireLogin, (req, res) => {
  res.render("index", { 
    activePage: "inicio", 
    usuario: req.session.user 
  });
});


// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));// 
