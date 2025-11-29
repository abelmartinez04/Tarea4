import bcrypt from "bcrypt";
import Usuario from "../models/usuarioModel.js";

const authController = {

  showLogin(req, res) {
    res.render("auth/login", { message: null });
  },

  showRegister(req, res) {
    res.render("auth/register", { message: null });
  },

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const usuario = await Usuario.findByUsername(username);

      if (!usuario) {
        return res.render("auth/login", { message: "Usuario no encontrado" });
      }

      const passwordValido = await bcrypt.compare(password, usuario.password);

      if (!passwordValido) {
        return res.render("auth/login", { message: "Contraseña incorrecta" });
      }

      req.session.user = {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre
      };

      res.redirect("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.render("auth/login", { message: "Error interno del servidor" });
    }
  },
showRegister(req, res) {
  res.render("auth/register", { message: null });
},

async register(req, res) {
  const { nombre, username, password } = req.body;

  try {
    const existe = await Usuario.findByUsername(username);
    if (existe) {
      return res.render("auth/register", { message: "El nombre de usuario ya está en uso." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Usuario.create({ nombre, username, password: passwordHash });

    return res.render("auth/login", { message: "Registro exitoso. Ingresa al sistema." });

  } catch (error) {
    console.error(error);
    res.render("auth/register", { message: "Error interno en el servidor." });
  }
},

  logout(req, res) {
    req.session.destroy(() => res.redirect("/login"));
  }

};

export default authController;
