//Librerias
import express from "express";
import { Router } from "express";
import { ProductManager } from "../classes/ProductManager.js"


// Creo la instancia Router Inicializamos
const productRouter = Router()

// Inicializamos productManager
const productManager = new ProductManager ("./productos.json")

// Configuracion
productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

let productos = []

//---    LEER PRODUCTOS   ---
//Debe leer el archivo productos y devolverlos dentro de un objeto
productRouter.get("/", async(req,res)=>{
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
    }catch (err){
        res.status(400).send({status: "Error", error: "Error al leer el producto",});
    }
})

//---    DEVUELVE PRODUCTO POR ID  ---
productRouter.get("/:pid", async(req,res)=>{
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
        
    }catch (err){
        res.status(400).send({status: "Error", error: "Error",});
    }
})


//---    AGREGAMOS PRODUCTO  ---
productRouter.post("/",async(req,res)=>{
    const {id,title, description,price,thumbnail,codigo, stock,status,category} = req.body
    const product = {}

    if(!title || !description || !price||!codigo||!stock||!status||!category){
        res.json({message: "faltan datos"})
    }else{
        product.id = id
        product.title = title //str
        product.description = description //str
        product.price = price //num
        product.stock =stock // num
        product.thumbnail = thumbnail //array
        product.codigo = codigo //str
        product.category = category
        product.status = status
        try{
            const response = await productManager.addProduct(product)
            res.json({message: "producto agregado", data:response})
        }
        catch(err){
            
            res.status(500).json({message:"Error interno servidor"})
        }
    }
})

//---    ACTUALIZAMOS PRODUCTO POR ID  ---
productRouter.put("/:pid", async(req,res)=>{
    const{pid} = req.params
    const{id,title, description,price,thumbnail,codigo, stock} = req.body
    const productTemp = {}
    let product = await productManager.getProductById(pid)
    try{
        
        if (product){
            //actualizar
            if(!title,!description,!codigo,!price,!thumbnail,!stock){
                res.json({message: "Faltan datos"})
            }
            productTemp.id = id
            productTemp.title =title
            productTemp.description = description
            productTemp.codigo=codigo
            productTemp.price = price
            productTemp.thumbnail=thumbnail
            productTemp.stock = stock
            productTemp.category = category
            productTemp.status = status

            let result= await productManager.updateProduct(pid,productTemp)
            //let result= await productManager.updateProductById(parseInt(pid),productTemp)
            res.json({message: "Producto actualizado", data: result})
        }
        else{
            res.json({message: "El producto solicitado no se puede actualizar"})
        }
        
    }catch (err){
        res.status(500).json({message:"Error interno servidor"})
    }

})

//---    ELIMINAMOS PRODUCTO POR ID  ---
productRouter.delete("/:pid", async(req,res)=>{
    const{pid} = req.params
    let product = await productManager.getProductById(pid)
    if(!product){
        res.json({message: "El producto no existe, no se puede eliminar"})
    }else{

        let result = await productManager.deleteProduct(pid)
        res.json({message: "Producto eliminado", data: result})
    }
})



export default productRouter