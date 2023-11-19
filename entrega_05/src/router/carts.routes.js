// Importamos modulos
import express from "express";
import { Router } from "express";
import  {CartManager } from "../classes/cartManager.js";
import { ProductManager } from "../classes/ProductManager.js"
// Se cren las instancias del router a utilizar y del CartManager. El parametro de ingreso es un archivo JSON para almacenar los datos
const routerCart = Router();
const carritoManager = new CartManager("./carrito.json");
let productos = new ProductManager("./productos.json");

routerCart.get("/", async (req, res) => {
    res.send("---  Esta es la ruta principal de la clase CartManager!  ---")})


//---    CREACION DEL CARRITO   ---
routerCart.post("/", async (req, res) => {
  // Intentamos agregar un nuevo carrito
  try {
    await carritoManager.addCarrito();
    res.json({status: "200", message: `El carrito se ha añadido correctamente`,});
  } catch (err) {
    // Manejo de errores
    res.status(400).send({ status: "Error", error: "Error al crear el carrito" });
  }
});

//---    LISTAR PRODUCTOS DEL CARRITO   ---
routerCart.get("/:cid", async (req, res) => {
  let { cid } = req.params;

  try { 
    const carrito = await carritoManager.getCarritoById(cid);
    res.json({ status: "200", message: carrito });
  } catch (err) {
    // Manejo de errores
    res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
  }
});

//---    AGREGAR PRODUCTO AL ARREGLO   ---
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const idCarrito = req.params.cid
  const idProduct = req.params.pid


  try {
    const carrito = await carritoManager.addProductToCarrito(
      idCarrito,
      idProduct
    );

    res.json({ status: "200", message: carrito });
  } catch (err) {
    // Manejo de errores
    res.status(400).send({status: "Error", error: "Error al cargar el producto al carrito",});
  }
});


export default routerCart;