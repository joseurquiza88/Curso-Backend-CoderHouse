// La configuracion esta en el index que esta en el dao
import { PRODUCTDAO } from "../dao/index.js";
//Guardamos producto dependiendo si es en memoria o si es en mongo
async function saveProduct (req,res){
    const product= req.body;
    await PRODUCTDAO.save(product);
    res.send(product)
}
//obtenemos productos dependiendo si es en memoria o si es en mongo
async function getAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    
    res.send (products)
}


//Exportamos las dos funciones
export {saveProduct,getAllProducts}