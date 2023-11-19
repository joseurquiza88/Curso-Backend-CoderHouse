//Nuevo archivo/controller
import { TICKETDAO } from "../dao/index.js";
import { USERDAO } from "../dao/index.js";
import { PRODUCTDAO } from "../dao/index.js";

//Guardamos ticket dependiendo si es en memoria o si es en mongo
async function saveTicket (req, res){
    const ticket = req.body;
    const user = req.user;
    await TICKETDAO.save(user);
    //Nuevo manejo de errores
    res.json(ticket) 
     //res.render('finishPurchase',{ticket:ticket})
}

//Obtenemos todos los ticket dependiendo si es en memoria o si es en mongo
async function getAllTickets(req,res){
    const tickets = await TICKETDAO.getAll();
    res.send (tickets)
}
//Obtenemos todos los ticket segun id dependiendo si es en memoria o si es en mongo
async function getTicketById(req,res){
    const tid = req.params.tid;
    const ticket = await TICKETDAO.getById(tid);
    ticket._id = ticket._id.toString(); 
    res.render('finishpurchase',ticket)//render con el mismo nombre de handlbars
  
}
async function getTicketByEmail(req,res){
    const userEmail = req.user.user.user.email;
    const ticket = await TICKETDAO.getByEmail(userEmail);
    ticket._id = ticket._id.toString(); 
    res.render('finishpurchase',ticket)//render con el mismo nombre de handlbars
  
}
//Exportamos
export {saveTicket,getAllTickets,getTicketById, getTicketByEmail}