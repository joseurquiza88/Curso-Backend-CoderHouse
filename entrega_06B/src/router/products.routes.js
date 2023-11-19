//Librerias
import express from "express";
import { Router } from "express";
import { ProductManager } from "../dao/fileManagers/ProductManager.js"


// Creo la instancia Router Inicializamos
const router = Router()

// Inicializamos productManager
//const productManager = new ProductManager ("./productos.json")
const products= new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
      const allProducts = await products.getAll();
      res.json({message: "Todos los productos",data:allProducts});
    } catch (error) {
      res.status(500).json({
          message:"Se ha producido un error al buscar los productos",
          error:error
      });
    }
  });
  
    
    // Obtener un producto por ID
    router.get('/:productId', async (req, res) => {
      const { productId } = req.params;
      try {
        const productById = await products.getById(productId);
        res.json({message:"Listado de productos",data:productById});
      } catch (error) {
          res.status(500).json({
              message:"Se ha producido un error al buscar el producto por id",
              error:error
          });
      }
    });
    
    // Crear un nuevo producto
    router.post('/', async (req, res) => {
      const productData = req.body;
      try {
        const newProduct = await products.save(productData);
        
        res.json({message:"El producto ha sido creado",data:newProduct});
      } catch (error) {
          res.status(500).json({
              message:"Se ha producido un error al crear el producto",
              error:error
          });
      }
    });
    
    // Actualizar un producto por ID
    router.put('/:productId', async (req, res) => {
      const { productId } = req.params;
      const updateData = req.body;
      try {
        const updatedProduct = await products.update(productId, updateData);
        res.json({message:"El producto ha sido actualizado",data:updatedProduct});
      } catch (error) {
          res.status(500).json({
              message:"Se ha producido un error al actualizar el producto",
              error:error
          });
      }
    });
    
    // Eliminar un producto por ID
    router.delete('/:productId', async (req, res) => {
      const { productId } = req.params;
      try {
        const productDeleted= await products.delete(productId);
        res.json({message:"El producto ha sido eliminado",data:productDeleted});
      } catch (error) {
          res.status(500).json({
              message:"Se ha producido un error al eliminar el producto",
              error:error
          });
      }
    });


export default router