import { Router } from "express";
import UserModel from "../dao/models/users.js"

//Crear base de datos con login
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await UserModel.findOne({ email: username, password }).lean();
  
  // Validación para el usuario administrador
  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session.user = {
      email: 'adminCoder@coder.com',//username,
      admin:true,
    };
   
  }
//validacion

  if (!result) {
    
    console.error('Error en la autenticación.')
    return res.status(401).json({ respuesta: "Error de autenticación" })
    };

    //Admin
  if (username !== 'adminCoder@coder.com' && password !== 'adminCod3r123'){ 
  req.session.user = {
    email: username,
    admin:false
  };
}


  res.status(200).json({respuesta: "Autorizado" });
});


//Ruta para crear el usuario en el modelo
router.post("/signup", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  const result = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password,
  });

  if (result === null) {
    return res.status(401).json({
      respuesta: "error",
    });
  } else {
    req.session.user = email;
    req.session.admin = true;
    res.status(200).json({
      respuesta: "ok",
      

    });
    console.log("Creacion exitosa")
    
  }
});


export default router;