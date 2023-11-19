import { Router } from "express";
import mongoose from "mongoose";
import { __dirname } from "../utils.js";
import { passportCall } from "../utils.js";
import * as dotenv from "dotenv";
//Desde el controller
import { saveProduct, getAllProducts, getProductById, deletedProduct, updatedProduct } from "../controller/product.controller.js";


const router = Router();
//Rutas con midlewares desde controller
//Ruta que busca todos los productos con estretegia jwt
router.get("/", passportCall('jwt'), getAllProducts);
//Ruta que guarda productos 
router.post("/",saveProduct);
//Ruta para obtener info por id
router.get("/:pid",getProductById);
//Ruta para actualizar info
router.post("/:pid",updatedProduct);
//Ruta para eliminar info
router.delete("/:pid",deletedProduct);

  export default router;