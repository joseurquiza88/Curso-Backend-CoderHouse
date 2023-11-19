// import { Router } from "express";
// import UserModel from "../dao/models/users.js"
// import { createHash ,isValidPassword} from "../utils.js";
// import passport from "passport";
// import { auth } from "./auth.router.js";


// //Crear base de datos con login
// const router = Router();
// /*
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const result = await UserModel.findOne({ email: username, password }).lean();
  
//   // Validación para el usuario administrador
//   if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//       req.session.user = {
//       email: 'adminCoder@coder.com',//username,
//       admin:true,
//     };
   
//   }
// //validacion

//   if (!result) {
    
//     console.error('Error en la autenticación.')
//     return res.status(401).json({ respuesta: "Error de autenticación" })
//     };

//     //Admin
//   if (username !== 'adminCoder@coder.com' && password !== 'adminCod3r123'){ 
//   req.session.user = {
//     email: username,
//     admin:false
//   };
// }


//   res.status(200).json({respuesta: "Autorizado" });
// });


// //Ruta para crear el usuario en el modelo
// router.post("/signup", async (req, res) => {
//   const { first_name, last_name, age, email, password } = req.body;

//   const result = await UserModel.create({
//     first_name,
//     last_name,
//     age,
//     email,
//     password,
//   });

//   if (result === null) {
//     return res.status(401).json({
//       respuesta: "error",
//     });
//   } else {
//     req.session.user = email;
//     req.session.admin = true;
//     res.status(200).json({
//       respuesta: "ok",
      

//     });
//     console.log("Creacion exitosa")
    
//   }
// });


// export default router;
// */
// // ENTREGA 09 - Passport
// // Ruta para login - failLogin
// router.post("/login",
//   passport.authenticate("login", {
//     failureRedirect: "/failLogin",
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).json("error de autenticacion");
//     }
    
//     req.session.user = {
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       email: req.user.email,
//       age: req.user.age,
//     };
//     req.session.admin = true;
//   //res.send({ status: "success", mesage: "user logged", user: req.user });
//   res.status(200).json({ respuesta: "Autenticado exitosamente" });
//   //res.status(200).json({ respuesta: "Success" });
//   }
// );

// router.get("/failLogin", async (req, res) => {
//   console.log("failed strategy");
//   res.send({ error: "failed" });
// });



// //Ruta para cambiar contraseña
// router.post("/forgot", async (req, res) => {
//   const { username, newPassword } = req.body;
//   const result = await UserModel.find({
//     email: username,
//   });
//   if (result.length === 0)
//     return res.status(401).json({
//       respuesta: "Usuario inexistente",
//     });
//   else {
//     const respuesta = await UserModel.findByIdAndUpdate(result[0]._id, {
//       password: createHash(newPassword),
//     });
//     console.log(respuesta);
//     res.status(200).json({
//       respuesta: "Cambio de contraseña exitosa",
//       datos: respuesta,
//     });
//   }
// });

// // Ruta para usuarios - privados
// router.get("/privado", auth, (req, res) => {
//   res.render("topsecret", {
//     nombre: req.session.user.first_name,
//     apellido: req.session.user.last_name,
//   });
// });

// //Ruta de registro - failregister con passport
// router.post(
//   "/signup",
//   passport.authenticate("register", {
//     failureRedirect: "/failRegister",
//   }),
//   async (req, res) => {
//     res.status(200).json({ respuesta: "ok" });
//   }
// );

// router.get("/failRegister", async (req, res) => {
//   console.log("failed strategy");
//   res.send({ error: "failed" });
// });


// //Ruta para loguarse con Github
// router.get(
//   "/github",
//   passport.authenticate("github", { scope: ["user:email"] }),
//   async (req, res) => {}
// );

// router.get(
//   "/githubcallback",
//   passport.authenticate("github", { failureRedirect: "/" }),
//   async (req, res) => {
//     req.session.user = req.user;
//     req.session.admin = true;
//     res.redirect("/api/products");
//   }
// );

// export default router;
import { Router } from "express";
import UserModel from "../dao/models/users.js"
//import notifier from 'node-notifier';
import { createHash ,isValidPassword} from "../utils.js";
import passport from "passport";


const router = Router();

//ruta para el login usando passport y faillogin
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/failLogin",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json("error de autenticacion");
    }
    
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    req.session.admin = true;
    res.status(200).json({ respuesta: "Autorizado" });
    //res.status(200).json({ respuesta: "Autenticado exitosamente" });
  // res.send({ status: "success", mesage: "user logged", user: req.user });
  }
);

router.get("/failLogin", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});


//ruta para cambiar contraseña
router.post("/forgot", async (req, res) => {
  const { username, newPassword } = req.body;

  const result = await UserModel.find({
    email: username,
  });
  if (result.length === 0)
    return res.status(401).json({
      respuesta: "el usuario no existe",
    });
  else {
    const respuesta = await UserModel.findByIdAndUpdate(result[0]._id, {
      password: createHash(newPassword),
    });
    console.log(respuesta);
    res.status(200).json({
      respuesta: "se cambio la contraseña",
      datos: respuesta,
    });
  }
});

//ruta para registrarse y para failregister usando passport
router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
  }),
  async (req, res) => {
    res.status(200).json({ respuesta: "ok" });
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});




//ruta para registare con github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.admin = true;
    res.redirect("/api/products");
  }
);
export default router;
