// Verificar si el usuario está logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      
      return next();// Si el usuario está logueado, continua
    } else {
      return res.redirect("/");// Sino vuelve a la ruta para iniciar sesion
  }
}
// Verificar autenticacion
  export function auth(req, res, next) {
    console.log("sesion",req.session);
    if (req.session?.user && req.session?.user.admin) {
       return next();
    }else return res.status(401).json("Error de autenticacion, por favor ingrese nuevamente los datos");
}

