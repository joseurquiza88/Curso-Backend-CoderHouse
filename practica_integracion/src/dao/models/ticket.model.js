import mongoose from 'mongoose';
//Base de datos con mongo de tickets, nuevo modelo
const ticketCollection = "tickets";
const ticketSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    purchase_datetime: {type: Date, default: Date.now},
    amount: { type: Number, required: true},
    purchaser: {type: String, required: true},
  });

//Modelo
const Ticket = mongoose.model(ticketCollection, ticketSchema);
//Exportamos
export default Ticket;