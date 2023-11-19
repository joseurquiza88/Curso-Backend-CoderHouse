import express from "express"
import { ProductManager } from "./ProductManager.js";

//Creamos servidor
const app = express ()
//Puerto donde vamos a trabajar
const PORT = 8080;
// Inicializamos productManager
const productManager = new ProductManager ("./productos.json")

let productos = []
//Ruta principal
app.get("/",(req,res)=>{
    res.send("---  Esta es la ruta principal de la clase ProductManager!  ---")
})


// endpoint Products
//Debe leer el archivo productos y devolverlos dentro de un objeto
app.get("/productos", async(req,res)=>{
    // Esto es para mostrar un numero de objetos del array
    const {limit} = req.query;
    
    try{
        //Llamo al metodo getProduct para leer los productos que estan en el carrito
        let response = await productManager.getProduct()
        //Si no le pongo un un numero de objetos que me muestre, devuelve todo
        // si existe limite solo devuelve ese numero de objetos
        if (limit){
            //Respuesta en formato JSON
            res.json(response.slice(0, limit))    
            }
        else{
            //Respuesta en formato JSON
            res.json(response);
        }
    }catch (error){
        console.log(error)
    }
})


app.get("/productos/:pid", async(req,res)=>{
    // modificamos el id en productsManager para que el id se guardara en string y no tener problemas!
    const {pid} = req.params
    try{
        // Utilizamos el metodo getProductbyId para que nos devuelva el producto solicitado
        let product = await productManager.getProductById(pid)
        if (product){
            res.json({message: "Producto encontrado", product})
        }
        else{
            res.json({message: "Producto no encontrado"})
        }
        
    }catch (error){
        throw new Error("ID incorrecto");
    }
})


app.listen(PORT, ()=>{
    console.log("El servidor esta corriendo en el puerto ", PORT)
})