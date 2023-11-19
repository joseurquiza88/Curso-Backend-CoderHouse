
// Importamos libreria base de datos
import mongoose from 'mongoose';


const cartsCollection = 'Carts';
//Generamos el esquema
const cartSchema = new mongoose.Schema({
  products: [
    {
        product: String,
        quantity: Number
    }
    
]
})
//modelo
const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;






