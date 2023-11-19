import { Router } from "express";
import {  passportCall } from "../utils.js";
import { logoutSession} from "../controller/logout.controller.js"

const router = Router();

// Cmbiamos funcion con el midleware
router.get("/",passportCall('jwt'),logoutSession);
 
export default router;