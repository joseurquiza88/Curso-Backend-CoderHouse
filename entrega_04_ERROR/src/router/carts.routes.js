// Importamos modulos
import express from "express";
import { Router } from "express";
import  {CartManager } from "../classes/cartManager.js";

// Se cren las instancias del router a utilizar y del CartManager. El parametro de ingreso es un archivo JSON para almacenar los datos
const routerCart = Router();
const carritoManager = new CartManager("./carrito.json");

// Configuracion
routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }));

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
    let { id } = Number(req.params.cid);
  try {
    const carrito = await carritoManager.getCarritoById(id);
    res.json({ status: "200", message: carrito });
  } catch (err) {
    // Manejo de errores
    res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
  }
});

//---    AGREGAR PRODUCTO AL ARREGLO   ---
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const idCarrito = Number(req.params.cid);
  const idProduct = Number(req.params.pid);

  console.log(idCarrito,idProduct)
  try {
    const carrito = await carritoManager.addProductToCarrito(
      idCarrito,
      idProduct
    );
    es.json({ status: "200", message: carrito });
  } catch (err) {
    // Manejo de errores
    res.status(400).send({status: "Error", error: "Error al cargar el producto al carrito",});
  }
});


export default routerCart;