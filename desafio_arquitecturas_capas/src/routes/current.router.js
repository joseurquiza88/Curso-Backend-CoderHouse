import { Router } from "express";
import { __dirname } from "../utils.js";
import passport from "passport";
import { passportCall,authorization} from "../utils.js";


const router = Router()
//estrategia jwt
router.get('/', passportCall('jwt'), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }
  console.log("mostrando desde current", req.user)
  //res.render('current', { user: req.user });
 res.json({ user: req.user });
});

export default router;


  