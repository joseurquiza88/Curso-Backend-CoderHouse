//Configuracion del logout
import { cartService, userService } from "../repositories/service.js";
//sesion - Logout
const logoutSession = async (req, res) => {
  try {
    const cartId = req.user.user.user.cart;
    // Buscar usuario
     const user = req.user;
    // Actualizar la conexion antes de destruir la sesión
    user.last_connection = new Date();
    await userService.updateUser();
    // Eliminar el carrito de compras
    await cartService.deleteCart(cartId);
    // Destruir la sesión
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({ respuesta: "Error en el servidor" });
      } else {
        // Limpiar el token y cerrar sesión
        res.clearCookie("CoderKeyQueNadieDebeSaber");
        console.log("La sesion ha sido cerrada");
        res.redirect("/");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error al cerrar sesión" });
  }
};
export { logoutSession };