import cartModel from '../models/cart.js';
// Modelo del carrito, permite obtener todos los datos, guaradarlo, eliminarlo y actualizar los datos
export default class Carts {
  async getAll() {
    return await cartModel.find({}).lean();
  }

  async getById(id) {
    return await cartModel.findById(id);
  }

  async save(data) {
    const createdCart = await cartModel.create(data);
    return createdCart;
    
 }

  async update(id, data) {
    const updatedCart = await  cartModel.findByIdAndUpdate(id, data);
    return updatedCart;
  }

  async delete(id) {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    return deletedCart;
  }
}