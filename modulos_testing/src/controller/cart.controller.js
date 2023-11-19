// La configuracion esta en el index que esta en el dao

// import { CARTDAO } from "../dao/index.js";
// import { TICKETDAO } from "../dao/index.js";
// import { PRODUCTDAO } from "../dao/index.js";
// Error
import CustomError from "../service/CustomError.js";
import EErrors from "../service/enum.js";
import { updateCartErrorInfo } from "../service/info.js";
//nuevo
import { cartService,productService, ticketService } from "../repositories/service.js";
import notifier from "node-notifier";//notificaciones


// Guardamos carrito
async function saveCart(req, res){
    const cart= req.body;
    //await CARTDAO.save(cart);
    await cartService.createCart(cart);
    res.send(cart)
}

//Todos los carritos
async function getAllCarts(req, res){
    //const carts = await CARTDAO.getAll();
    const carts = await cartService.getAllCarts();
    res.render ('cart',{carts:carts})//render
}
//Carrito por id
async function getCartById(req, res){
    const cid = req.params.cid;
    const cartById = await cartService.getCartById(cid);
    cartById._id = cartById._id.toString();
    let newCart = {
      _id: cartById._id,
      products: cartById.products.map((product) => {
        return {
          _id: product.product._id,
          name: product.product.name,
          description: product.product.description,
          price: product.product.price,
          category: product.product.category,
          availability: product.product.availability,
          quantity: product.quantity,
        };
      }),
      total: cartById.total,
    };
    console.log(newCart);
    res.render("cart", newCart);
  };



//Nueva funcion manejo de errores de update - Manejo de errores
const updateCart = async (req, res) => {
  const cid = req.user.user.user.cart;
  const pid = req.params.pid;
  const role = req.user.user.user.role;
  const email = req.user.user.user.email;
 
  try {
    const product = await productService.getProductById(pid);
  
    if (role === 'premium' && product.owner === email) {
      notifier.notify({
        title: 'Error',
        message: 'Error al agregar producto al carrito'
        
      });
      return;
    } else {
      const productInCart = await cartService.isProductInCart(cid, pid);
      
      if (productInCart) {
        notifier.notify({
          title: 'Exito',
          message: 'Producto agregado al carrito'
          
        });
        return cartService.incrementProductQuantity(cid, pid);
      } else {
        notifier.notify({
          title: 'Exito',
          message: 'Producto agregado al carrito'
        });
        return cartService.addProductToCart(cid, pid);
      }
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    throw error;
  }
};
/*
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
*/
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
  //const cart = await CARTDAO.getCartId(cid);
  const cart = await cartService.getCartById(cid);
  const randomCode = getRandomInt(1000, 9999); //valores random
  //generamos ticket
  const newTicket = {
      code:randomCode,
      purchase_datetime: new Date(),
      amount:cart.total,
      purchaser: user.user.user.email
  }
 // const ticket = TICKETDAO.newTicket(newTicket)
 const ticket = ticketService.createTicket(newTicket);
  const productsNotPurchased = [];
  // Recorre los productos en el carrito
  for (const item of cart.products) {
    const productId = item.product;
    const quantity = item.quantity;
    // Vemos la disponibilidad dle producto
    const product = await productService.getProductById(productId);
    if (!product) {
      productsNotPurchased.push({ productId, response: "Producto no encontrado" });
      continue; 
    }

    if (product.availability < quantity) {
      productsNotPurchased.push({ productId, response: "Error, no hay stock disponible" });
      continue; 
    }
    // Eliminamos producto
    product.availability -= quantity;
     // Guarda la actualización en la base de datos
     await productService.updateProduct(productId,product);
    // Elimina el producto comprado del carrito
    await cartService.removeProductFromCart(cid, product.id);
   
  }
  res.send( ticket)
}



const deleteCart = async (cartId) => {
  try {
    const existCart = await cartService.getCartById(cartId);

    if (!existCart) {
      throw new Error("Carrito no encontrado");
    }
    await cartService.deleteCart(cartId);
  } catch (error) {
    console.error("Error al eliminar el carrito", error);
    throw error;
  }
};

export { saveCart, getAllCarts, getCartById, updateCart, generatedTicket, deleteCart };

//3era Preentrega 
//Actualizamos carrito
// async function updateCart(req,res){
//     const cid = req.user.user.user.cart;
//     const pid = req.params.pid;
//     const updateCart = await CARTDAO.addProductToCart(cid, pid);
//     //console.log(updateCart);
//     res.send(updateCart)
   
// }