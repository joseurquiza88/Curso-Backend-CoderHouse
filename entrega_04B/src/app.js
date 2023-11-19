import express from "express"
import cartsRouter from "./router/carts.routes.js"
import productRouter from "./router/products.routes.js"


//Creamos servidor
const app = express ()
//Puerto donde vamos a trabajar
const PORT = 8080;
let productos = []


app.use(express.json())

//Ruta principal prueba
app.get("/",(req,res)=>{
    res.send("hola mundo")
})

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


app.listen(PORT, ()=>{
    console.log("El servidor esta corriendo en el puerto ", PORT)
})

