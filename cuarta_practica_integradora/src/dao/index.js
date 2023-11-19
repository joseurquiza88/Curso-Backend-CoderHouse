
// En el caso que sea con persistencia de memoria se dirige a "MEMORY sino con base de datos de "MONGO"
import memoryProductDao from "./memory/product.dao.js";
import mongoProductDao from "./class/product.dao.js";
import memoryUserDao from "./memory/user.dao.js";
import mongoUserDao from "./class/user.dao.js";
import memoryCartDao from "./memory/cart.dao.js";
import mongoCartDao from "./class/cart.dao.js";
//Nuevas rutas de tickets
import memoryTicketDao from "./memory/ticket.dao.js";
import mongoTicketDao from "./class/ticket.dao.js"; 
import { PERSISTENCE } from "../config/config.js";

export const PRODUCTDAO = PERSISTENCE === "MONGO" ? new mongoProductDao(): new memoryProductDao();
export const CARTDAO = PERSISTENCE === "MONGO" ? new mongoCartDao(): new memoryCartDao();
export const USERDAO = PERSISTENCE === "MONGO" ? new mongoUserDao(): new memoryUserDao();
//Nueva ruta de tickets
export const TICKETDAO = PERSISTENCE === "MONGO" ?new mongoTicketDao(): new memoryTicketDao();
