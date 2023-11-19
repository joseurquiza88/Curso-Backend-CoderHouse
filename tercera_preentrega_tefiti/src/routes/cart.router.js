//Importamos varios
import { Router } from "express";
import { passportCall} from "../utils.js";
import {isUser} from "./auth.router.js";
import { saveCart, getAllCarts, getCartById, updateCart,generatedTicket} from "../controller/cart.controller.js";
import { saveTicket, getTicketById,getTicketByEmail} from "../controller/ticket.controller.js";

//Inicializamos el router
const router = Router();
//Rutas varias usando el controller y el archivo auth.router
//Acceso segun estrategias jwt, obtener todos los carritos
router.get("/",passportCall('jwt'), isUser, getAllCarts); //middleware para la autorizacion
//Ruta para Acceso segun estrategias jwt, guardar carrito
router.post("/",passportCall('jwt'), isUser, saveCart); //middleware para la autorizacion
//Ruta para buscamos por id
router.get("/:cid",passportCall('jwt'), isUser, getCartById); //middleware para la autorizacion
//Ruta para actualizar carrito
router.post("/:cid/product/:pid", passportCall('jwt'), isUser, updateCart); //middleware para la autorizacion
//Ruta para guardar ticket
//router.post("/:cid/purchase/",passportCall('jwt') ,isUser,saveTicket); error
router.post("/:cid/purchase/",passportCall('jwt') ,isUser,generatedTicket);//middleware para la autorizacion
//Get ticket email
router.get("/:cid/finishpurchase/",passportCall('jwt') ,isUser,getTicketByEmail);
//REVISAR!!
//Ruta para eliminar un producto del carrito, Revisar esta parte
 router.delete('/:cartId/:productId', (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
  
    try {
       const success = cartsManager.removeFromCart(cartId, productId);
  
      if (success) {
        res.status(200).json({ message: 'El producto ha sido eliminado del carrito' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar un producto del carrito', error: err });
    }
  });
  

// Ruta para agregar un arreglo de productos al carrito
router.put('/:cid/', async (req, res) => {
  const cartId = req.params.cid;
  const productsToAdd = req.body.products; 
   try {
    const cart = await cartsManager.getById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Carito no encontrado' });
    }
    cart.products = cart.products.concat(productsToAdd);
    await cart.save();

    res.status(200).json({ message: 'Productos agregados al carrito', cart: cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar productos al carrito', error: error });
  }
});


//Ruta para eliminar todos los productos del carrito
router.delete('/:cid/', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartsManager.getById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });

    }
    cart.products = [];
    await cart.save();

    res.status(200).json({ message: 'Todos los productos del carrito fueron eliminados', cart: cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar todos los productos del carrito', error: error });
  }
});

 //Ruta que permite actualizar solo la cantidad de un producto en el carrito
 router.put('/:cid/updatequantity/:productId', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.productId;
  const newQuantity = req.body.quantity; 

  try {
    const cart = await cartsManager.getById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const productToUpdate = await cartsManager.findProductInCartAndUpdateQuantity(cartId, productId, newQuantity);//Buca y actualiza
    
    await cart.save(); // Guarda cambios en BD

    res.status(200).json({ message: 'Cantidad actualizada', cart: cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cantidad', error: error });
  }
});

export default router;
