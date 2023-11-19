// Importamos librerias y modulos
import express from 'express';
import {engine} from 'express-handlebars'
import __dirname from './utils.js';
import viewsRouter from './router/views.routes.js';
import realTimeProducts from "./router/realTimeProducts.routes.js"
import {Server} from 'socket.io' 
import { saveProduct } from './services/productUtils.js';
import { deleteProduct } from './services/productUtils.js';
import cartsRouter from "./router/carts.routes.js"
import productRouter from "./router/products.routes.js"

//Creamos servidor
const app = express ()
//Puerto donde vamos a trabajar
const PORT = 8080;
//let productos = []

// cofiguracion
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware para leer la carpeta publica
app.use(express.static("public"))

//config para usar handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)
//Ruta principal prueba
app.get("/ruta",(req,res)=>{
    res.send("hola mundo")
})


//Rutas varias
app.use("/", viewsRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", realTimeProducts)

//comenzamos a trabajar con sockets.
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente se ha conectado");
    
    //socket on escucha
   socket.on('message', (data) => {
        console.log(data)
    })

    //socket emit envia
    socket.emit('render', "Me estoy comunicando desde el servidor")
    //Agregamos
    socket.on("addProduct", product => {
        saveProduct(product) 
        socket.emit("show-new-products", product)
    })
    //Borramos
    socket.on("delete-product", productId => {
        const {id} = productId
        deleteProduct(id) 
        socket.emit('delete-product', id)
    })
    
})