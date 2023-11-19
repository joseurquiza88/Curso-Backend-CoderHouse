//Importamos libreria de base de datos
import mongoose from 'mongoose';

const productsCollection='Products';

//Creamos base de datos caracterizando los tipo de datos
const productSchema = new mongoose.Schema({
  
    title: {
      type:String,
      required: true
  },
  description: {
      type:String,
      required: true
  },
  price: {
      type: Number, 
      required: true
  },
  thumbnails: Object,
  code: {
      type: String,
      unique: true,
      required:true
  },
  stock: Number, 
  status: Boolean,
  category: String 
});

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;


