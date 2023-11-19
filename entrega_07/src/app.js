// Importamos librerias y modulos
import express from 'express';
import {engine} from 'express-handlebars'
import __dirname from './utils.js';
import {Server} from 'socket.io' 
import { saveProduct } from './services/productUtils.js';
import { deleteProduct } from './services/productUtils.js';
import cartsRouter from "./router/carts.routes.js"
import productRouter from "./router/products.routes.js"
import messageRouter from './router/message.router.js';
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const connection = mongoose.connect(MONGO_URI);
// Cargar las variables de entorno desde el archivo .env donde esta mongoose
dotenv.config();

// cofiguracion
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware para leer la carpeta publica
app.use(express.static("public"))

//config para usar handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

// Configurar la conexión a MongoDB usando las variables de entorno que estan en .env

let dbConnect = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
});
// Control de conexion
dbConnect.then(
    () => {
      console.log("Conexión a la base de datos exitosa");
    },
    (error) => {
      console.log("Error en la conexión a la base de datos", error);
    }
  );

//Ruta principal prueba
app.get("/ruta",(req,res)=>{
    res.send("hola mundo")
})

//Rutas varias
app.use("/api/cart", cartsRouter);
app.use("/api/products", productRouter);
app.use('/api/messages', messageRouter);

// Iniciar el servidor, dejamos de lado el socket server
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));