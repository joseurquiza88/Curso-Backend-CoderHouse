// La configuracion esta en el index que esta en el dao
import { CARTDAO } from "../dao/index.js";
// Guardamos carrito
async function saveCart(req,res){
    const cart= req.body;
    await CARTDAO.save(cart);
    res.send(cart)
}
//Obtenemos todos los carritos
async function getAllCarts(req,res){
    const carts = await CARTDAO.getAll();
    res.send (carts)
}

export {saveCart,getAllCarts}