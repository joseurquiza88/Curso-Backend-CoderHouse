import { Router } from "express";
import { __dirname } from "../utils.js";
import { auth } from "./auth.router.js";
// Render
const router = Router()
// Ruta Autenticacion a ruta privada
router.get('/', auth, (req, res) => {
      res.render('private',{})
    });

export default router;