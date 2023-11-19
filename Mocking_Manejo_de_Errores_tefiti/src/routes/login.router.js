
import { Router } from "express";
//Instanciamos router
const router = Router();
// render del login
router.get("", (req, res) => {
  res.render("login", {
    title: "Iniciar sesion",
  });
});

export default router;