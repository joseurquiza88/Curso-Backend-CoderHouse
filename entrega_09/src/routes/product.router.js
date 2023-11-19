import { Router } from "express";
import { __dirname } from "../utils.js";

import Products from "../dao/fileManagers/productManager.js";

// Creamos router
const router=Router();
//Creamos clase
const products=new Products();

// Ruta para obtener todos los productos sin paginas
router.get('/all', async (req, res) => {
  try {
    const allProducts = await products.getAll();
    res.render('product',{products:allProducts});
  } catch (error) {
    res.status(500).json({
        message:"Error, no se pueden mostrar todos los productos",
        error:error
    });
  }
});

//// Ruta para obtener todos los productos dividos en paginas
router.get("/", async (req, res) => {
  const { limit, page, filter, sort, category, availability } = req.query;
  const defaultLimit = 12;
  const defaultPage = 1;
  
  // Numero de productos divido 12
  const currentPage = parseInt(page, 12) || defaultPage;
  
  try {
    let response = await products.getAll();
     // Filtros y ordem
    if (filter === "category") {
      response = await products.getByCategory(category);
    } else if (filter === "availability") {
      response = await products.getByAvailability(availability);
      
      }
    if (sort === 'asc' || sort === 'desc') {
      response.sort((a, b) => {
        return sort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    //Configuracion de la visualizacion
    const startIndex = (currentPage - 1) * (limit ? +limit : defaultLimit);
    const endIndex = startIndex + (limit ? +limit : defaultLimit);
    const paginatedResponse = response.slice(startIndex, endIndex);
    const totalPages = Math.ceil(response.length / (limit ? +limit : defaultLimit));
    //Render de la pagina/view product.handlebars
    res.render('product', {
      products: paginatedResponse,
      pagination: {
        status: 'success',
        totalPages: totalPages,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: endIndex < response.length ? currentPage + 1 : null,
        page: currentPage,
        hasPrevPage: currentPage > 1,
        hasNextPage: endIndex < response.length,
        prevLink: currentPage > 1 ? `/api/products?page=${currentPage - 1}` : null,
        nextLink: endIndex < response.length ? `/api/products?page=${currentPage + 1}` : null
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: err
    });
  }
});

// Ruta para obtener un producto por ID
  router.get('/:productId', async (req, res) => {
    const  productId  = req.params.productId;
    try {
      const productById = await products.getById(productId);
      res.render('productdetail', { product: productById }); 
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar el producto por id",
        error: error
      });
    }
  });
    
  // Ruta para crear un nuevo producto
  router.post('/', async (req, res) => {
    const productData = req.body;
    try {
      const newProduct = await products.save(productData);
      
      res.json({message:"Producto creado",data:newProduct});
    } catch (error) {
        res.status(500).json({
            message:"Error al crear el producto",
            error:error
        });
    }
  });
  
  // Ruta para actualizar un producto por ID
  router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;
    try {
      const updatedProduct = await products.update(productId, updateData);
      res.json({message:"Producto actualizado",data:updatedProduct});
    } catch (error) {
        res.status(500).json({
            message:"Error al actualizar el producto",
            error:error
        });
    }
  });
  
  //Ruta para eliminar un producto por ID
  router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
      const productDeleted= await products.delete(productId);
      res.json({message:"El producto se ha eliminado",data:productDeleted});
    } catch (error) {
        res.status(500).json({
            message:"Error al eliminar el producto",
            error:error
        });
    }
  });
  
  export default router;