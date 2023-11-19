import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"; //Esto nos va a servir para hacer el paginate, revisar!!

const productsCollection='Products';

const productSchema = new mongoose.Schema({
  
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   category: { type: String, required: true },
   availability: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate); // esto se lo agregamos para hacer el paginate, solo lo hacemos en productos no en carrito
const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;