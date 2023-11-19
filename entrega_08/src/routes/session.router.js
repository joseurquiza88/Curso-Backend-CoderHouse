import { Router } from "express";
import UserModel from "../dao/models/users.js"
import { createHash ,isValidPassword} from "../utils.js";
import passport from "passport";

//Crear base de datos con login
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await UserModel.findOne({ email: username, password }).lean();

  // Validación para el usuario administrador
  if (username === 'admin@coder.com' && password === 'admin123') {
      req.session.user = {
      email: username,
      admin:true,
    };

  }
//validacion
  if (!result) {
    console.error('Error en la autenticación.')
    return res.status(401).json({ respuesta: "Error de autenticación" })
    };
    //Admin
  if (username !== 'admin@coder.com' && password !== 'admin123'){ 
  req.session.user = {
    email: username,
    admin:false
  };
}
  res.status(200).json({ respuesta: "Autorizado" });
});


export default router;
