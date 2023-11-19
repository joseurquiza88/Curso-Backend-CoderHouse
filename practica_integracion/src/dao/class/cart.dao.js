// Manager de carts
import cartModel from "../models/cart.model.js";
import productsModel from "../models/product.model.js";
import mongoose from "mongoose";

//Clase para base de datos
export default class CartDao {
  constructor() {/////
  }
  ///Buscamos todos los carritos
  async getAll() {
    return await cartModel.find({}).lean();
  };
    //Funcion para buscar carrito segun el ID 
  async getById (cid)  {
    let result = await cartModel.findById({_id:cid});
    return result;
  };
  //Se crea el carrito por primera vez
  async save(data) {
    const newCart = await cartModel.create(data);
    return newCart
  };
 //Funcion para actualizar un carrito
  async update(id, data) {
    const updatedCart = await  cartModel.findByIdAndUpdate(id, {products:data});
    return updatedCart;
  };
  
//Funcion para poder eliminar un carrito
  async delete(id) {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    return deletedCart;
  };

 ////Funcion para eliminar un producto seleccionado. Revisar!!!
 async removeFromCart(cid, pid) {
  try {
    const cart = await cartModel.findOne({ _id: cid });
    const updatedProducts = cart.products.filter(
      (p) => String(p.product._id) !== pid
    );
    cart.products = updatedProducts;
    const updatedCart = await cart.save();

    if (!updatedCart) {
      console.log("Carrito no encontrado");
      return null;
    }
    console.log("Carrito actualizado", updatedCart);
    return updatedCart;
  } catch (error) {
    console.error("Error al eliminar producto del carrito", error);
    throw error;
  }
}
//Funcion para buscar un producto en el carrito
  async  isProductInCart(cartId, productId) {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      if (cart) {
        const productInCart = cart.products.some(({ product }) => String(product._id) === productId);
        if (productInCart) {
          return productInCart;
        } else {
         // Si el producto no está en el carrito retorna null
          return null;
        }
      } else {
        // Si el carrito no encontrado retorna null
        return null; 
      }
    } catch (error) {
      //console.error("Error al buscar producto en el carrito:", error);
      throw error;
    }
  }
  
  
//Si el producto ya existe en el carrito, sumamos ==> incrementar quantity
   async incrementProductQuantity(cid, pid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productIndex = cart.products.findIndex(
        (p) => String(p.product._id) === pid
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
        const updatedCart = await cart.save();
  
        if (!updatedCart) {
          console.log("Carrito no encontrado");
          return null;
        }
  
        console.log("Carrito actualizado", updatedCart);
        return updatedCart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.error("Error al incrementar la cantidad del producto", error);
      throw error;
    }
  }
  
  
// Se agrega agregar un producto al carrito
async addProductToCart(cid, pid) {
  try {
    const cart = await cartModel.findOne({ _id: cid });
    const productExists = cart.products.some(
      (p) => String(p.product) === pid
    );
    //Vemos si ya existe el producto
    if (!productExists) {
      const newProduct = { product: pid, quantity: 1 }; 
      cart.products.push(newProduct);
      const updatedCart = await cart.save();

      if (!updatedCart) {
        console.log("Carrito no encontrado");
        return null;
      } 
      console.log("Carrito actualizado", updatedCart);
      return updatedCart;
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    throw error;
  }
}

   //Se busca el producto en el carrito segun id y se actualiza la cantidad e
  async findProductInCartAndUpdateQuantity(cid, pid, newQuantity) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productIndex = cart.products.findIndex(
        (p) => String(p.product._id) === pid
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity=newQuantity;
        const updatedCart = await cart.save();
  
        if (!updatedCart) {
          console.log("Carrito no encontrado");
          return null;
        }
  
        console.log("Carrito actualizado");
        return updatedCart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.error("Error al incrementar la cantidad del producto", error);
      throw error;
    }
  }
}