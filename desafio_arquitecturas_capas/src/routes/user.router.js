import { Router } from "express";

import { saveUser,getAllUsers } from "../controller/user.controller.js";

const router = Router();
//Nuevas rutas
router.get("/",getAllUsers);
router.post("/",saveUser);

export default router;