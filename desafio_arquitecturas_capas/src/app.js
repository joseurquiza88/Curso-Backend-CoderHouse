//Importamos librerias
import express from "express";
import handlebars from "express-handlebars";
import {engine} from 'express-handlebars'
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import {Server} from 'socket.io' 
import passport from "passport";
//rutas
import {__dirname,generateToken,authToken, passportCall, authorization} from "./utils.js"
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import messageRouter from './routes/message.router.js';
import LoginRoute from "./routes/login.router.js";
import SignupRoute from "./routes/signup.router.js";
import SessionRoute from "./routes/session.router.js";
import LogoutRouter from "./routes/logout.router.js";
import PrivateRouter from "./routes/private.router.js"
import ForgotRouter from "./routes/forgot.router.js"
import FailLoginRouter from "./routes/session.router.js";
import FailRegisterRouter from "./routes/session.router.js";
import initializePassport from "./config/passport.config.js";
import CurrentRouter from "./routes/current.router.js";
import UserRouter from "./routes/user.router.js";



// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();
app.use(cookieParser("C0d3rS3cr3t")); //firma de las cookies

// ----  BD configuracion -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;


// ----  Configuraciones -----
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));// ahora public esta dentro de src, ver
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ----  configuracion de handlebars  -----
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// ----  manejo de sesion storage  -----
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 100,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);


// ----  Inicializacion passport  -----
initializePassport();
app.use(passport.initialize());
app.use(passport.session()) 


// ----  Configuracion de mongoose  -----
const environment = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conexion a la base de datos exitosa")
  } catch (error) {
    console.log(error);
  }
};

environment();


// ---- CONFIGURACION DE RUTAS ----
// Ruta de prueba
// app.get('/', (req, res) => {
//   res.send('Ecommerce');
// });

app.use("/", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/api/session", SessionRoute);
app.use('/api/products', productRouter);
app.use( '/api/carts', cartRouter)
app.use('/api/messages', messageRouter);
app.use("/logout",LogoutRouter);
app.use("/private",PrivateRouter)
app.use("/forgot", ForgotRouter );
app.use("/",FailLoginRouter)
app.use("/",FailRegisterRouter)
app.use("/current",CurrentRouter); 
app.use("/user",UserRouter);//nueva ruta



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