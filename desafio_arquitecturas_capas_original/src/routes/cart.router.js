//Importamos
import { Router } from "express";
import Carts from "../dao/fileManagers/cartManager.js";
// import productsModel from "../dao/models/product.js";
// import Product from '../dao/fileManagers/productManager.js'; 

//import productsModel from "../dao/mongo/models/product.js";
//Carpeta controller
import { saveCart,getAllCarts } from "../controller/cart.controller.js";

//Inicializamos el router
const router = Router();

router.get("/",getAllCarts);
router.post("/",saveCart);

// Ruta para mostrar un carrito por su ID
const cartsManager = new Carts();
router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  try {
     const cartData = await cartsManager.getById(cartId);

    if (!cartData) {
      res.status(404).json({ error: "El carrito no ha sido encontrado" });
      return;
    }
  
    res.render('cart', { carts: [cartData] }); //render - cart
  } catch (error) {
    res.status(500).json({
      message: "Error, no se puede obtener el carrito",
      error: error,
    });
  }
});
  
        
//Ruta para agregar producto al carrito. Si ya existe el producto, se incrementa, sino lo agrega
  router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
  
      const cartData = await cartsManager.getById(cartId);
      if (!cartData) {
        res.status(404).json({ error: "El carrito no se ha encontrado" });
        return;
      }
  
      const existingProduct = await cartsManager.isProductInCart(cartId,productId);
      if (existingProduct) {
        
        await cartsManager.incrementProductQuantity(cartId, productId);// Si existe el producto, se suma 1
      } else {
        
        await cartsManager.addProductToCart(cartId, productId);// Sino existe el producto, se agrega el producto
      }
      res.json({
        message: "El producto ha sido agregado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al agregar el producto al carrito",
        error: error,
      });
    }
  });
  
  
  //Ruta para eliminar un producto del carrito
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


// -------------------------------------------------------------- //
/* Entrega practica integradora
//Nueva clase del carrito, lo instanciamos
const cartsManager = new Carts();
//Nueva clase del producto, lo instanciamos
const productsManager = new Product();

// Ruta para mostrar el carrito Mostrar el carrito
router.get('/', async (req, res) => {
  try {
    const showCart = await cartsManager.getAll();
    res.render('cart',{carts:showCart});
  } catch (error) {
    res.status(500).json({
        message:"Error, no se puede mostrar el carrito",
        error:error
    });
  }
});
  // Ruta para crear un nuevo carrito
  router.post('/', async (req, res) => {
    const cartData = req.params;
    try {
      const newCart = await cartsManager.save(cartData);
  
      res.json({message:"El Carrito se ha creado correctamente",data:newCart});
    } catch (error) {
        res.status(500).json({
            message:"Error, no se puede crear el carrito",
            error:error
        });
    }
  });
*/