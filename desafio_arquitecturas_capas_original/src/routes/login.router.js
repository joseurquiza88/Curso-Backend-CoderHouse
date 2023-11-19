import { Router } from "express";
const router = Router();
// render
router.get("", (req, res) => {
  res.render("login", {
    title: "Iniciar sesion",
  });
});


export default router;