import { Router } from "express";
import { getProductsList } from "../services/productUtils.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    const products = getProductsList();
    //Busca la plantilla home de handlebars
    res.render("home", {products})
})

export default viewsRouter;