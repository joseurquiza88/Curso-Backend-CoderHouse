//Importamos librerias
import express from "express";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import nodemailer from 'nodemailer';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import initializePassport from "./config/passport.config.js";
import { Server } from "socket.io";
import { createServer } from "http";
import * as dotenv from "dotenv";
import {__dirname} from "./utils.js";
import cookieParser from "cookie-parser";
import LoginRoute from "./routes/login.router.js";
import SignupRoute from "./routes/signup.router.js";
import SessionRoute from "./routes/session.router.js";
import ProductRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js";
import UserRouter from "./routes/user.router.js";
import LogoutRouter from "./routes/logout.router.js";
import CurrentRouter from "./routes/current.router.js";
import ForgotRoute from "./routes/forgot.router.js"
import FailLogin from "./routes/session.router.js";
import FailRegister from "./routes/session.router.js";
import ChatRouter from "./routes/chat.router.js";
import PrivateRouter from "./routes/private.router.js";
import UpdateProductsRouter from "./routes/updateproducts.router.js";
import MockingRouter from "./routes/mocking.router.js"
import { loggerMiddleware } from "./logger.js";
import LoggerRouter from "./routes/loggerTest.router.js"
//Nueva ruta de mocking
import RestorePass from "./routes/restorePassword.router.js";


//import UpdateProductsRouter from "./routes/updateproducts.router.js";
// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();
const httpServer = createServer(app);
app.use(cookieParser("C0d3rS3cr3t"));; //firma de las cookies

// ----  BD configuracion -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;


// ----  Configuraciones -----
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ----  configuracion de handlebars  -----
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
handlebars.compileOptions = { allowProtoMethodsByDefault: true };

// ----  manejo de sesion storage  -----
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 10,
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

// ----  SwaggerOptions  -----

const SwaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion del proyecto",
      description: "Curso Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

//conectamos Swagger
const specs = swaggerJsdoc(SwaggerOptions);


// ---- CONFIGURACION DE RUTAS ----
// Ruta de prueba
// app.get('/', (req, res) => {
//   res.send('Ecommerce');
// });
// Pruebas
app.use(loggerMiddleware);
app.use("/loggertest",LoggerRouter);
app.use("/", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/api/session/", SessionRoute);
app.use("/api/products/",ProductRouter);
app.use("/private",PrivateRouter);
app.use("/logout",LogoutRouter);
app.use("/current",CurrentRouter);
app.use("/forgot", ForgotRoute);
app.use("/",FailLogin);
app.use("/",FailRegister);
app.use("/api/carts/",CartRouter);
app.use("/api/user",UserRouter);
app.use("/chat",ChatRouter);
app.use("/api/updateproducts/",UpdateProductsRouter);
app.use("/mockingproducts",MockingRouter);

//Nueva 
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/restorepassword",RestorePass);




// ---- CONFIGURACION DEL SOCKET----
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejar eventos personalizados
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);

    // Enviar una respuesta al cliente
    socket.emit('respuesta', 'Mensaje recibido correctamente');
  });
 
   socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});



// ---- ESCUCHAMOS AL SERVIDOR ---
httpServer.listen(PORT, () => {
  console.log(`Escuchando el servidor en el puerto : ${PORT}`);
});


// const httpServer = app.listen(PORT, () => {
//   console.log(`Escuchando al puerto ${PORT}`)
// })

// const socketServer = new Server(httpServer);

// socketServer.on('connection', socket => {
//   console.log("Nuevo cliente se ha conectado");
  
//   //socket on escucha
//  socket.on('message', (data) => {
//       console.log(data)
//   })

//   //socket emit envia
//   socket.emit('render', "Me estoy comunicando desde el servidor")
//   //Agregamos
//   socket.on("addProduct", product => {
//       saveProduct(product) 
//       socket.emit("show-new-products", product)
//   })
//   //Borramos
//   socket.on("delete-product", productId => {
//       const {id} = productId
//       deleteProduct(id) 
//       socket.emit('delete-product', id)
//   })
  
// })