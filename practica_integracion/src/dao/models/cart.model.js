// Confiiguramos la base de datos del carrito
import mongoose from 'mongoose';

const cartsCollection = 'Carts';

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {type: mongoose.Schema.Types.ObjectId,ref: "Products", },
        quantity: {type: Number,},
      },
    ],
    default: [], // Sino hay carrito es un array vacio
  },
},{
  toJSON: { getters: true } // Habilita los getters al convertir a JSON
});

// Getter para calcular el total automáticamente
cartSchema.virtual('total').get(function() {
  let total = 0;
  for (const product of this.products) {
    total += product.quantity * product.product.price;
  }
  return total.toFixed(2); 
});

// Generamos los populates considerando las distintas funciones de find
cartSchema.pre("findById", function () {this.populate("products.product");});

cartSchema.pre("findOne", function () {this.populate("products.product");});

cartSchema.pre("find", function () {this.populate("products.product")});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;