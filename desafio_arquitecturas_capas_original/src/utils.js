import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from 'bcrypt';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
  console.log({ "cloud password": savedPassword, loginPassword: password });
  return bcrypt.compareSync(password, savedPassword);
};


//Clave privada para generar token
const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" }); //se pueden poner otros tiempos para que expirw
  return token;
};
//Autenticacion
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ error: "Error de autenticacion" });

  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, PRIVATE_KEY, (err, user) => {
    if (err) res.status(403).json({ error: "Token inválido" });

    req.user = user;
    next();
  });
};

//Passport para estrategia de auntenticacion
const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user) {
        if (info && info.message) {
          return res.status(401).json({ status: "Error", message: info.message });
        } else {
          return res.status(401).json({ status: "Error", message: "No autorizado" });
        }
      }

      req.user = user; // Asignamos al user
      next();
    })(req, res, next);
  };
};


const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(401).send({ error: "No autorizado" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No tiene permiso" });
    next();
  };
};

export { generateToken, authToken, passportCall, authorization };