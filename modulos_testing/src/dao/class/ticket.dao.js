// Manager de tickets
//Importamos modelo de tickets
import ticketModel from '../models/ticket.model.js';

//Exportamos clase con default con las funciones para gestionar los productos
//Clase para base de datos
export default class TicketDao {
//Obtenemos todos los datos
constructor() {
}
  async getAll() {
    let tickets = await ticketModel.find({}).lean();
    return tickets;
  }
//Obtenemos datos por id de interes
  async getById(tid) {
      let ticketId= await ticketModel.findById(tid);
      return ticketId;
  }; 
//Guardamos info, creamos data
  async save(data) {
    const newTicket = await ticketModel.create(data);
    return newTicket;
  };
//Actualizamos info el id/tid
  async update(tid, data) {
    const updatedTicket = await ticketModel.findByIdAndUpdate(tid, data, {new : true});
    return updatedTicket;
  };
//Eliminamos info
  async delete(tid) {
    const deletedTicket = await ticketModel.findByIdAndDelete(tid);
    return deletedTicket;
  };
  //Nuevo ticket generamos ticket
  async getByEmail(userEmail) {
    let ticket= await ticketModel.findOne({purchaser:userEmail});
    return ticket;
};
// Nuevo ticket generamos ticket
//   async newTicket(data) {
//     const newTicket = await ticketModel.create(data);
//     return newTicket;
//   };
}