//Mensajes chat 
import messageModel from '../models/message.js';

export default class Messages {
  async getAll() {
    return await messageModel.find({}).lean();
  }

  async save(data) {
    const newMessage = await messageModel.create(data);
    return newMessage;
  }

}