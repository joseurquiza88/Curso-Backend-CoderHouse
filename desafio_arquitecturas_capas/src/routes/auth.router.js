// Verificamos si el usuario esta logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      
      return next();// Si  está logueado, continua
    } else {
      // Si no está logueado, vuelve al inicio de sesión
      return res.redirect("/");
    }
  }
  
    // Verificar si el usuario tiene autorizacion para continuar
  export function auth(req, res, next) {
    console.log("sesion",req.session);
    if (req.session?.user && req.session?.user.admin) {
       return next();
    }
    else return res.status(401).json("Error de autenticacion, por favor ingrese nuevamente los datos");
}

