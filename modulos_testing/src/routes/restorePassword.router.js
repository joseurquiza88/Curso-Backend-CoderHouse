import { Router } from "express";
import userModel from '../dao/models/user.model.js'

const router = Router();
//Nuevo para restaurar contraseña
router.get("", (req, res) => {
  res.render("restore", {
    title: "Quiere cambiar su contraseña?",
  });
});
//Segun el mail del formulario, enviamos mail
router.post("/sendmail", async (req, res) => {
    const email = req.body.email; 
    // Verifica si el correo existe en base de datos
    const user = await userModel.findOne({ email }); 
    if (!user) {//sino error
      return res.status(400).json({ success: false, message: "Error, email no encontrado" });
    }
    // Genera un enlace de recuperación con un token único y con tiempo de expiracion
    const token = generateUniqueToken();
    const expirationTime = new Date(); // Calcula la hora de expiración
    expirationTime.setHours(expirationTime.getHours() + 1);
    // Guarda el token y la hora de expiración en tu base de datos
    user.resetPasswordToken = token;
    user.resetPasswordExpiration = expirationTime;
    await user.save();//guardamos
    // Se envia el correo
    const recoveryLink = `URL_BASE_DEL_SITIO/reset-password/${token}`;
    enviarCorreoRecuperacion(email, recoveryLink);
    res.json({ success: true, message: "El correo de recuperación fue enviado, por favor revise para restablecer su cuenta" });
  });
  
export default router;