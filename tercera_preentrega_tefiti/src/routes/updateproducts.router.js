import { Router } from "express";
import { passportCall} from "../utils.js";
import {isAdmin} from "./auth.router.js";
import { getAllProductsForAdmin,saveProduct,deletedProduct,updatedProduct,getProductByIdForAdmin} from "../controller/product.controller.js";

//Iniciamso
const router = Router();
//rutas de actualizacion productos con jwt
router.get("/",passportCall('jwt') ,isAdmin,getAllProductsForAdmin);
router.post ("/",passportCall('jwt') ,isAdmin,saveProduct);
router.delete("/:pid",passportCall('jwt') ,isAdmin,deletedProduct);
router.post("/:pid",passportCall('jwt') ,isAdmin,updatedProduct);
router.get ("/:pid",passportCall('jwt') ,isAdmin,getProductByIdForAdmin);


export default router;