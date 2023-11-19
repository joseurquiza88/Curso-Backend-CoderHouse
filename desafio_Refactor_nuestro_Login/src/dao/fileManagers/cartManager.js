// Manager de carritos
//Importamos modelo del carrito
import cartModel from "../models/cart.js";

//Exportamos clase con default con las funciones para gestionar el carrito
export default class Carts {
  //Buscamos todos los carritos
  async getAll() {
    return await cartModel.find({}).lean();
  };
 //Buscamos un carrito
  async getOne (id)  {
    let result = await cartModel.findById(id).lean();
    return result;
  };
  
  //Buscamos carrito por id
  async getById(id) {
    return await cartModel.findById(id)
  };

  //Se crea el carrito por primera vez
  async save(data) {
    const newCart = await cartModel.create(data);
    return newCart;
 };

 //Se actualiza el carrito
  async update(id, data) {
    const updatedCart = await  cartModel.findByIdAndUpdate(id, {products:data});
    return updatedCart;
  };

//Se elimina el carrito
  async delete(id) {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    return deletedCart;
  };

 //Se elimina del carrito el producto seleccionado
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


  //Se busca un producto en el carrito segun ID
  async  isProductInCart(cartId, productId) {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      if (cart) {
        const productInCart = cart.products.some(({ product }) => String(product._id) === productId); //Lo pasamos a str
        if (productInCart) {
          return productInCart;
        } else {
          return console.error("El producto no está en el carrito"); 
        }
      } else {
        return console.error("Carrito no encontrado"); 
      }
    } catch (error) {
      console.error("Error al buscar producto en el carrito:", error);
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
          
          return console.log("Carrito no encontrado");
        }
  
        console.log("Carrito actualizado", updatedCart);
        return updatedCart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.error("Error, no se puede agregar mas unidades del producto", error);
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
        (p) => String(p.product._id) === pid //cambiamos a str
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
      console.error("Error, no se puede agregar mas unidades del producto", error);
      throw error;
    }
  }
}