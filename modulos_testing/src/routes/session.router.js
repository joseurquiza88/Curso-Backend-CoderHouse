
// export default router;
import notifier from 'node-notifier';
import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import CartModel from "../dao/models/cart.model.js";
import { passportCall,createHash ,authorization,generateToken, isValidPassword} from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ email: username });

  if (!user) {
    return res.json({ status: "error", message: "Usuario no encontrado" });
  } else {
    // Crea un carrito vacío para el usuario
    const cart = [];
    // Crea un nuevo carrito en la base de datos y guarda el ID en el usuario
    const newCart = await CartModel.create({ products: cart });
    user.cart = newCart._id; // Asignar el ID 
    // Guardar cambios en el usuario
    await user.save();
    // Genera el token con información del usuario y el carrito
    const myToken = generateToken({ user, cart });

    res
      .cookie("CoderKeyQueNadieDebeSaber", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ status: "success", respuesta: "Autenticado exitosamente" });
  }
});




//ruta para registrarse y para failregister usando passport
router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
  }),
  async (req, res) => {
    res.status(200).json({ respuesta: "ok" });//esta es la repuesta que toma el js
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


/*router.get("/failLogin", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
}); 

//ruta para cambiar contraseña
router.post("/forgot", async (req, res) => {
  const { username, newPassword } = req.body;

  const result = await UserModel.find({email: username,});
  if (result.length === 0)
    return res.status(401).json({
      respuesta: "Usuario inexistente",
    });
  else {
    const respuesta = await UserModel.findByIdAndUpdate(result[0]._id, {
      password: createHash(newPassword),
    });
    console.log(respuesta);
    res.status(200).json({
      respuesta: "Se cambio la contraseña",
      datos: respuesta,
    });
  }
});
*/