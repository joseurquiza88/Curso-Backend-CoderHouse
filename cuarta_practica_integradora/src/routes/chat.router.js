import {Router} from "express";
import { __filename, __dirname } from '../utils.js';
import { passportCall} from "../utils.js";
import { isUser } from "./auth.router.js";
//Instanciamos router
const router = Router();
//Chat con estrategias jwt
router.get('/',passportCall('jwt'), isUser,(req, res)=> {
    res.render('chat', {});
  });
  
export default router;