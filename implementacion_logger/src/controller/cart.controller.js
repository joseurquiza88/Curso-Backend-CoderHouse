// La configuracion esta en el index que esta en el dao

import { CARTDAO } from "../dao/index.js";
import { TICKETDAO } from "../dao/index.js";
import { PRODUCTDAO } from "../dao/index.js";
//Error - nuevo
import CustomError from "../service/CustomError.js";
import EErrors from "../service/enum.js";
import { updateCartErrorInfo } from "../service/info.js";

// Guardamos carrito
async function saveCart(req, res){
    const cart= req.body;
    await CARTDAO.save(cart);
    res.send(cart)
}

//Todos los carritos
async function getAllCarts(req, res){
    const carts = await CARTDAO.getAll();
    res.render ('cart',{carts:carts})//render
}
//Carrito por id
async function getCartById(req, res){
    const cid = req.params.cid;
    const cartId = await CARTDAO.getCartId(cid);
    cartById._id = cartById._id.toString(); 
    res.render ('cart',{carts : cartId}) //res.send(cartId)

}

//Nueva funcion manejo de errores de update - Manejo de errores
async function updateCart(req, res) {
  try {
      const cid = req.user.user.user.cart;
      const pid = req.params.pid;
      const product = await PRODUCTDAO.getById(pid);

      if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
          throw new CustomError(EErrors.InvalidData, "Por favor revisar!!. El producto es inválido o posee datos faltantes.");
      }

      const updateCart = await CARTDAO.addProductToCart(cid, pid);
      console.log(updateCart);
      res.send(updateCart);
  } catch (error) {
      if (error instanceof CustomError) {
          const errorInfo = updateCartErrorInfo(error);
          res.status(errorInfo.statusCode).json(errorInfo);
      } else {
          console.error("Error no controlado:", error);
          res.status(500).json({ message: "Error interno del servidor." });
      }
  }
}

/*async function updateCart(req, res) {
  try {
      const cid = req.user.user.user.cart;
      const pid = req.params.pid;
      const product = await PRODUCTDAO.getById(pid); //buscamos por id

      if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
          throw new CustomError(EErrors.InvalidData, "Por favor revisar!!. El producto es inválido o posee datos faltantes.");
      }
      const updateCart = await CARTDAO.addProductToCart(cid, pid);//actualizamos carrito
      console.log(updateCart);
      res.send(updateCart);
  } catch (error) {
    //manejo de errorres, nuevo tema
      if (error instanceof CustomError) {
          const errorInfo = updateCartErrorInfo(error);
          res.status(errorInfo.statusCode).json(errorInfo);
      } else {
          //console.error("Error no controlado:", error);
          res.status(500).json({ message: "Error interno del servidor." });
      }
  }
}*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//Generamos los tkets
async function generatedTicket(req,res){
  const user =  req.user;
  const cid = req.params.cid;
  const cart = await CARTDAO.getCartId(cid);
  const randomCode = getRandomInt(1000, 9999); //valores random
  //generamos ticket
  const newTicket = {
      code:randomCode,
      purchase_datetime: new Date(),
      amount:cart.total,
      purchaser: user.user.user.email
  }
  const ticket = TICKETDAO.newTicket(newTicket)

  const productsNotPurchased = [];

  // Recorre los productos en el carrito
  for (const item of cart.products) {
    const productId = item.product;
    const quantity = item.quantity;
    // Vemos la disponibilidad dle producto
    const product = await PRODUCTDAO.getById(productId);

    if (!product) {
      productsNotPurchased.push({ productId, response: "Producto no encontrado" });
      continue; 
    }

    if (product.availability < quantity) {
      productsNotPurchased.push({ productId, response: "Disponibilidad insuficiente" });
      continue; 
    }
    // Eliminamos producto
    product.availability -= quantity;
     // Guarda la actualización en la base de datos
     await product.save();
    // Elimina el producto comprado del carrito
    await CARTDAO.removeFromCart(cid, product.id);
   
  }
  res.send( ticket)
}





export {saveCart,getAllCarts,getCartById,updateCart,generatedTicket}

//3era Preentrega 
//Actualizamos carrito
// async function updateCart(req,res){
//     const cid = req.user.user.user.cart;
//     const pid = req.params.pid;
//     const updateCart = await CARTDAO.addProductToCart(cid, pid);
//     //console.log(updateCart);
//     res.send(updateCart)
   
// }