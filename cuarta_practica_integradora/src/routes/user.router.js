import { Router } from "express";
import { saveUser, getAllUsers, getUserById, changeRoleUser, getUserForChange, getUserByEmail, goUpDocument, uploadDocument, getProfile } from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
import multer from 'multer';
//import { isUser,isAdmin } from "./auth.router.js";
const router = Router();

// Configuración de Multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Nuevas rutas
router.get("/",getAllUsers);
router.post("/",saveUser);
router.get("/:uid",getUserById);
router.get("/premium/:uid",passportCall("jwt"), getUserForChange);
router.post("/premium/:uid",passportCall("jwt"),changeRoleUser);
router.get("/byemail/:userEmail",passportCall("jwt"),getUserByEmail)
//Nuevas
router.get("/:uid/documents", passportCall("jwt"), goUpDocument)
router.post("/:uid/documents", passportCall("jwt"), upload.array('documents'), uploadDocument);
router.get("/:uid/profile", passportCall("jwt"), getProfile)

export default router;