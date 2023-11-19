import { Router } from "express";
import { __dirname } from "../utils.js";
import { auth } from "./middlewares.router.js";

const router = Router()
// Ruta Autenticaciom
router.get('/', auth, (req, res) => {
      res.render('private',{})
    });

export default router;

  