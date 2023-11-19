import { Router } from "express";
import { passportCall } from "../utils.js";
import { createUserDTO } from "../DTO/userDTO.js"//"../DTO/userDTO.js";  ///nuevo archivo

//Instanciamos router
const router = Router()
//estrategia jwt
router.get('/', passportCall('jwt'), (req, res) => {
  if (!req.user) {//si no exoste
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }
  //console.log("mostrando desde current", req.user)
  //res.render('current', { user: req.user });
  const userDTO = createUserDTO(req.user); //cambio
  res.json({ user: userDTO });
});

export default router;


  