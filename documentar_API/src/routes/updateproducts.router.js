import { Router } from "express";
import { passportCall} from "../utils.js";
import {isAdmin,isPremium} from "./auth.router.js";// es para corroborar que sea admin
import { getAllProductsForAdmin,saveProduct,deletedProduct,updatedProduct,getProductByIdForAdmin} from "../controller/product.controller.js";

//Iniciamso
const router = Router();
//rutas de actualizacion productos con jwt.
//Tenemos que verificar si es admin para que pueda cambiar los productos, subir nuevos o eliminar otros segun disponibilidad
//Si llega a esas rutas e sporque es admin
//se modifico verificar
router.get("/",passportCall('jwt') , getAllProductsForAdmin);
router.post ("/",passportCall('jwt') ,saveProduct);
router.delete("/:pid",passportCall('jwt') , deletedProduct);
router.post("/:pid",passportCall('jwt') ,updatedProduct);
router.get ("/:pid",passportCall('jwt') ,getProductByIdForAdmin);



export default router;