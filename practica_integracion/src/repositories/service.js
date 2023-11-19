//Nueva enterga 
import Users from "../dao/class/user.dao.js";
import UserRepository from "./user.repository.js";
import Products from "../dao/class/product.dao.js";
import ProductRepository from "./product.repository.js";
import Tickets from "../dao/class/ticket.dao.js";
import TicketRepository from "./tickets.repository.js";
import Carts from "../dao/class/cart.dao.js";
import CartRepository from "./cart.repository.js";

//Intanciamos objetos
const usersDao = new Users();
const productsDao = new Products();
const ticketsDao = new Tickets();
const cartsDao = new Carts();

export const userService = new UserRepository(usersDao);
export const productService = new ProductRepository(productsDao);
export const ticketService = new TicketRepository(ticketsDao);
export const cartService = new CartRepository(cartsDao);