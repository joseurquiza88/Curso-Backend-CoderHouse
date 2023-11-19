// Importamos libreria base de datos
import mongoose from "mongoose";
//Coleccion
const messageCollection='Mesagges';

//Generamos nuevo esquema
const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
});

const messageModel = mongoose.model(messageCollection, messageSchema);
//Exportamos
export default messageModel;