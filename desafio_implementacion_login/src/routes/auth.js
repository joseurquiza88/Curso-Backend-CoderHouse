// Middleware para verificar si el usuario está logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      // Si el usuario está logueado, permite el acceso a la siguiente ruta
      return next();
    } else {
      // Si el usuario no está logueado, redirige al inicio de sesión
      return res.redirect("/");
    }
  }
  
    // Verificar si el usuario tiene autorizacion para ir a la ruta privada
  export function auth(req, res, next) {
    console.log("sesion",req.session);
    if (req.session?.user && req.session?.user.admin) {
       return next();
    }
    else return res.status(401).json("Error de autenticacion");
}

