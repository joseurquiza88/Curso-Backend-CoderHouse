//En este archivo definimos si usamos persistencia en archivo o en base de datos
//export const PERSISTENCE = "MEMORY";
//export const PERSISTENCE = "MONGO";

//Nueva entrega, relacionamos todo con el arvhico env. Ahi es donde estan todos los datos
import dotenv from "dotenv";

dotenv.config();

export const PERSISTENCE = process.env.PERSISTENCE || "MONGO";

export default {
  app: {
    ENV: process.env.NODE_ENV || "production",
  },
  mailing: {
    SERVICE: process.env.MAILING_SERVICE,
    USER: process.env.MAILING_USER,
    PASSWORD: process.env.MAILING_PASSWORD,
  },
  mongo: {
    URL: process.env.MONGO_URL,
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET,
  },
};