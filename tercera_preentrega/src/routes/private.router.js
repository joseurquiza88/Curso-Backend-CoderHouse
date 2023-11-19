import { Router } from "express";
import { __dirname } from "../utils.js";
import { passportCall} from "../utils.js";
import {isAdmin} from "./auth.router.js";

// Render
const router = Router()
// Ruta Autenticacion a ruta privada
// router.get('/', auth, (req, res) => {
//       res.render('private',{})
//     });
router.get('/', passportCall('jwt') ,isAdmin,(req, res) => {
  const { user } = req;
  res.json({ message: "usuario autorizado ", user});
}); 

export default router;