import passport from "passport";
import local from "passport-local";
import User from "../models/user.model.js";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";
import * as dotenv from "dotenv";

dotenv.config();

const LocalStrategy = local.Strategy;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
          let user = await User.findOne({
            email: profile?.emails[0]?.value,
          });
          if (!user) {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              age: 18,
              password: crypto.randomBytes(20).toString("hex"),
            };
            let result = await User.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  // Determinamos estrategia para el registro
    passport.use(
      "register",
      new LocalStrategy(
        {
          passReqToCallback: true,
          usernameField: "email",
        },
        async (req, username, password, done) => {
          const { first_name, last_name, email, age } = req.body;
          try {
            //Buscar usuario por email
            const user = await User.findOne({ email: username });
            console.log("user", user);
            if (user) {// si existe..
                //console.log("Usuario existente");
                return done(null, false, { message: "Usuario existente"});
              }
            //Sino existe crear usuario
            const newUser = { first_name,last_name,age,email,password: createHash(password),} // hasheamos contraseña, encriptada           
            console.log("Nuevo usuario", newUser);
            let result = await User.create(newUser);//creacion de usuario
            return done(null, result);
          } catch (error) { //Sino error
            return done("Error al crear el usuario", error);
          }
        }
      )
    );
  
    // Determinamos estrategia para el Login
    passport.use(
        "login",
        new LocalStrategy(
            async ( username, password, done) => {
            try {
              const user = await User.findOne({ email:username});
              if (!user) {
                console.log("Error el usuario no existe")
                return done(null, false, { message: "Usuario no entocontrado" });
              }
                if (!isValidPassword(user.password, password)) {
                return done(null, false, { message: "Contraseña incorrecta" });
              } else {
                return done(null, user);
              }
            } catch (error) {
                return done("Error al obtener el usuario", error);
            }
          }
        )
      );
      // Serializacion y deserializacion
      passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
      passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);
        done(null, user);
      });
    
    }


  export default initializePassport;