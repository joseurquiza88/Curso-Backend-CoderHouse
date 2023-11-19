import { Router } from "express";

import Carts from "../dao/mongoManagers/cartManager.js";
//import productsModel from "../dao/models/product.js";
import Products from '../dao/mongoManagers/productManager.js'; 

const router = Router();
// Creamos una intancia de carritos
const carts = new Carts();
// Creamos una intancia de productos para agregar al carrito
const productsManager = new Products(); 

// Rutas varias para mostrar, crear, agregar y eliminar un producto
// Mostrar el carrito
router.get('/', async (req, res) => {
  try {
    const showCart = await carts.getAll();
    res.json({message: "Este es el carrito",data:showCart});
  } catch (error) {
    res.status(500).json({
        message:"Se ha producido un error al mostrar el carrito",
        error:error
    });
  }
});

  // Crear un nuevo carrito
  router.post('/', async (req, res) => {
    const cartData = req.body;
    console.log(cartData)
    try {
      
      const newCarts = await carts.save(cartData);
      
      res.json({message:"Se ha creado un carrito de productos",data:newCarts});
    } catch (error) {
        res.status(500).json({
            message:"Se ha producido un error al crear el carrito",
            error:error
        });
    }
  });
  

//agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
         
    const cartData = await carts.getById(cartId);

    if (!cartData) {
      res.status(404).json({ error: "Carrito no ha sido encontrado" });
      return;
    }

    const existingProduct = await productsManager.getById(productId);
   
    if (existingProduct) {
    
      const cartUpdated = await carts.update(cartId, existingProduct);
      res.json({
        message: "Producto agregado al carrito correctamente",
        data: cartUpdated,
      });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      error: error,
    });
  }
});
  
  
  // Eliminar el carrito
  router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    try {
      const cartDeleted= await carts.delete(cartId);
      res.json({message:"Carrito eliminado",data:cartDeleted});
    } catch (error) {
        res.status(500).json({
            message:"Se ha producido un error al eliminar el carrito",
            error:error
        });
    }
  });
  
  export default router;