
import { __dirname } from "../utils.js";
import { passportCall } from "../utils.js";
import jwt from "../config/passport.config.js"

//Midlewares varios para la autenticacion
// Verificamos si el usuario esta logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      
      return next();// Si  está logueado, continua
    } else {
      // Si no está logueado, vuelve al inicio de sesión
      return res.redirect("/");// redireccion
    }
  }
  // Verificar si es un administrador
export function isAdmin(req, res, next) {
  if (req.user && req.user.user.user.role == 'admin') {
    next(); 
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}
// Verificar si es un usuario
export function isUser(req, res, next) {
  if (req.user && req.user.user.user.role == 'user') {
    next(); 
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}
   
// Verificar sesion
export function getUserInSession(req, res, next) {
  const uid = req.user.user.user._id;
  if (uid) {
    next(); 
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

 // Verificar si el usuario tiene autorizacion para continuar
 export function auth(req, res, next) {
  console.log("sesion",req.user);
  if (req.user && req.user.role === 'admin')  {
     return next();
}
else return res.status(401).json("Error de autenticacion, por favor ingrese nuevamente los datos");
}
