//Nuevo archivo/controller
// import { TICKETDAO } from "../dao/index.js";
// import { USERDAO } from "../dao/index.js";
// import { PRODUCTDAO } from "../dao/index.js";

import { ticketService } from "../repositories/service.js";
//Guardamos ticket dependiendo si es en memoria o si es en mongo
async function saveTicket (req, res){
    const ticket = req.body;
    const user = req.user;
    await ticketService.createTicket(user); 
    res.json(ticket)
}
//Obtenemos todos los ticket 
async function getAllTickets(req,res){
    const tickets = await ticketService.getAllTickets();
    res.send (tickets)
}
//Obtenemos todos los ticket segun id 
async function getTicketById(req,res){
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    ticket._id = ticket._id.toString(); 
    res.render('finishpurchase',ticket)//render con el mismo nombre de handlbars
  
}
//Obtenemos todos los ticket segun email
async function getTicketByEmail(req,res){
    const userEmail = req.user.user.user.email;
    const ticket = await ticketService.getTicketByEmail(userEmail);
    ticket._id = ticket._id.toString(); 
    res.render('finishpurchase', ticket)//render con el mismo nombre de handlbars
  
}
//Exportamos
export {saveTicket,getAllTickets,getTicketById, getTicketByEmail}