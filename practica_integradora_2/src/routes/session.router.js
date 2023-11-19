
// export default router;
import { Router } from "express";
import UserModel from "../dao/models/users.js";
import { passportCall,createHash ,authorization,generateToken, isValidPassword} from "../utils.js";
import passport from "passport";


const router = Router();
//Entrega anterior de login con github y passport
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


//Login con estrategia j
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ email: username })
  if (!user) {
      return res.json({ status: "error", message: "Usario no encontrado" })
  } else {
          const myToken = generateToken(user)
          res
          .cookie("CoderKeyQueNadieDebeSaber", myToken, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true
          })
          .json({ status: "success" , respuesta: "Autenticado exitosamente" })
      }
  }
)




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
