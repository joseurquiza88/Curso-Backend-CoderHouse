//Nueva ruta con mocking
import {Router} from "express";
import { __filename, __dirname } from '../utils.js';
import { generateProductMocks } from "../utils.js";

//Instanciamos router
const router = Router();
//Manejo de errores segun profe
router.get('/',(req, res)=> {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProductMocks());
  }
    res.render('mocking', {products});//render
  });
  
export default router;