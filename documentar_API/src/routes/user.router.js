import { Router } from "express";
import { saveUser,getAllUsers,getUserById,changeRoleUser, getUserForChange,getUserByEmail } from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
//import { isUser,isAdmin } from "./auth.router.js";
const router = Router();
//Nuevas rutas
router.get("/",getAllUsers);
router.post("/",saveUser);
router.get("/:uid",getUserById);
router.get("/premium/:uid",passportCall("jwt"),getUserForChange);
router.post("/premium/:uid",passportCall("jwt"),changeRoleUser);
router.get("/byemail/:userEmail",passportCall("jwt"),getUserByEmail)

export default router;