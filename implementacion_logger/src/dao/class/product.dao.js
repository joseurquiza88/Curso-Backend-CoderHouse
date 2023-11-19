
// Manager de productos
//Importamos modelo del productos
import productsModel from '../models/product.model.js';

//Exportamos clase con default con las funciones para gestionar los productos
//Clase para base de datos
export default class ProductDao {
    // Buscamos todos los productos
  async getAll() {
    let products = await productsModel.find({}).lean();
    return products;
  }
// Buscamos un producto por ID
  async getById(id) {
      let productId= await productsModel.findById(id);
      return productId
  };
  // Buscamos un producto por categoria
  async getByCategory(filter) {
    const products = await productsModel.find()
    const productsByCategory = products.filter(
      (p) => String(p.category) == filter
   );
   return productsByCategory;
}
 // Buscamos un producto por disponibilidad
async getByAvailability(filter) {
  try {
    const products = await productsModel.find();
    const productsByAvailability = products.filter(
      (p) => String(p.availability) == filter
    );
    if (productsByAvailability.length>0){ 
        return productsByAvailability;
    }else{
     console.error("No existe un producto con esa disponibilidad");
    }
    } catch (error) {
    console.error("Error al obtener productos por falta de disponibilidad", error);
    throw error;
    }
}
// Guardamos datos
async save(data) {
    const newProduct = await productsModel.create(data);
    return newProduct;
  };
//Actualizamos productos
  async update(id, data) {
    const updatedProduct = await productsModel.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
  };
//Eliminamos producto
  async delete(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(id);
    return deletedProduct;
  };
}