//Importamos
import express from 'express';
import mongoose from 'mongoose';
import handlebars, { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as dotenv from "dotenv";
import {Server} from 'socket.io' 
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import messageRouter from './routes/message.router.js';


// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();
// cofiguracion
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const connection = mongoose.connect(MONGO_URI);



//Conexion a mongo
connection.then(
    () =>{
        console.log("Conexion a la base de datos exitosa")
    },
    (error) =>{
        console.log("Error al conectarse a la base de datos")
    }
)

// Configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views"); //ojo con el dirname, probar
app.set("view engine", "handlebars");
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Ecommerce');
});
// Configurar las rutas del carrito y productos
app.use('/api/products', productRouter);
app.use( '/api/carts', cartRouter)
app.use('/api/messages', messageRouter);




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