import { Router } from "express";
import {getProductsList} from "../services/productUtils.js"

const realTimeProducts = Router();

realTimeProducts.get("/", (req, res) => {

    const products = getProductsList()
    
    //Renderizamos en esta ruta para que muestre los productos. 
    //Debe ser eñ nombre del handlebars
    res.render("realTimeProducts", {products})
})

export default realTimeProducts;