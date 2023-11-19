import fs from "fs"
//const fs = require ("fs")
 export class ProductManager {
    products;
    static ultimoId = 1
    constructor(path){
      this.products = [];
        this.path= path;

    }
    // Agrega un producto al arreglo de productos inicial
    //Se debe validar que no se repita el campo code y que todos los campos sean obligatorios
    // Al agregarlos debe crearse con ID autoincrementable

    addProduct = (producto) =>{ 
        const products = this.getProduct(); 
        let idStr = products.length + 1
        const newProduct = { 
          //id: idStr.toString(), 
          id: idStr, 
          title: producto.title,
          description: producto.description,
          price: producto.price,
          thumbnail: producto.thumbnail,
          codigo: producto.codigo,
          stock: producto.stock,
          category: producto.category,
          status:producto.status
        };
        //Genero un array de un producto
        // Compruebo que se hayan completado todos los datos
        if(newProduct.title === undefined || newProduct.description===undefined || newProduct.price===undefined ||
          // newProduct.thumbnail===undefined || No es obligatorio
          newProduct.category=== undefined || newProduct.status === undefined || 
            newProduct.codigo===undefined ||newProduct.stock===undefined){
            throw new Error(`El producto ${newProduct.title} no ha sido cargado, debe completar todos los datos.`);
          }
          //Genero un array de un producto
          // Compruebo que se hayan completado todos los datos 
          const indexProducto =  products.findIndex( (element) => element.codigo === newProduct.codigo);
         
          if (indexProducto===-1){
            //Si no existe el codigo agrego a la lista el producto
            products.push(newProduct); 
            this.guardarEnArchivo(products) 
            console.log(`El ${newProduct.title} se ha cargado correctamente`);
            return newProduct; 
          }
          // Si el producto ya existe, lanzo un error y no lo agrego a la lista
          else{
            throw new Error(`El producto ${newProduct.title} ya se encuentra cargado`);
          }
      }
    
    // Devuelve el arreglo con todos los produtos creados hasta el momento.
    // Ahora el producto se guarda en un archivo, por lo que debo leerlo con la funcion readFileSync
    getProduct(){
      try{ 
        const resultado = fs.readFileSync(this.path, "utf-8")
         const data = JSON.parse(resultado) 
        return (data);
        }
        // Sino encuentra el archivo, retorna un array vacio
        catch(error){
            return []
        }
    }
    // Busca en el arreglo el producto que coincida con el ID, 
    // SI NO coincide el ID, devolver  mensaje con "Not founded"
    getProductById = (ID) => {
      try{
        const data = this.getProduct()
        const idEncontrado = data.find( producto => producto.id === ID);
        if (idEncontrado === undefined) {

          throw new Error(`ID ${ID} no encontrado`);
        }
        return idEncontrado
      } 
    catch(error){
        throw new Error(`ID incorrecto`);
      }
     }

    // Funcion para guardar los datos de los productos en un archivo. Esta recibe una lista de productos del constructor como parametro
    guardarEnArchivo(products) { 
    // Es necesario convertir  la lista de productos en una cadena JSON utilizando JSON.stringify() 
    const data = JSON.stringify(products); 
    // Guardamos los datos en el archivo de forma síncrona
    fs.writeFileSync(this.path, data); 
  }

  //método updateProduct, el cual debe recibir el id del producto a actualizar
  updateProduct(ID, updatedFields) {
   try{
      const products = this.getProduct();
      const indexProducto =  products.findIndex( (element) => element.id === ID);

       if (indexProducto!==-1){
          
         //Si no existe el codigo agrego a la lista el producto
       const newProduct = {id: ID, // Genero un ID autoincrementable 
          title: updatedFields.title,
          description: updatedFields.description, 
          price:updatedFields.price, 
          //thumbnail:updatedFields.thumbnail,
           codigo:updatedFields.codigo, 
           status:updatedFields.status, 
           category:updatedFields.category, 

           stock:updatedFields.stock}
           
           products[indexProducto] = newProduct
          //se guarda esta nueva lista de productos llamando al metodo saveProducts().
           this.guardarEnArchivo(products); 
           
           //nos retorna el objeto actualizado
           return console.log(products); 
       }

     }
     catch(error){
       throw new Error(`ID ${ID} no se ha podido actualizar`);
   }
   }
   /*Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo. */
   deleteProduct(ID){
    try{
      const products = this.getProduct();
      const indexProducto =  products.findIndex( (element) => element.id === ID);
    

       if (indexProducto!==-1){
          
          products.splice(indexProducto,1)

           this.guardarEnArchivo(products); //se guarda esta nueva lista de productos llamando al metodo saveProducts().
           
           return console.log("El objeto fue eliminado, los productos restantes son: ",products); //nos retorna el objeto actualizado
       }

     }
     catch(error){
       throw new Error(`ID ${ID} not found`);
   }

   }
}

// TESTING
console.log(" -----------------------    TESTING      -----------------------")

// const pruebaProductManager = new ProductManager('./productos.json'); //Se crea una instancia de ProductManager pasando la ruta del archivo como argumento.


// Agregar un producto
// const newProduct2 = { 
//     title: 'Producto prueba',
//     description: 'Este es un producto de prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     codigo: 'abc123',
//     stock: 25
//   };

// let prueba2 = pruebaProductManager.addProduct(newProduct2); 
// console.log('Todos los productos:', prueba2);


// // Obtener todos los productos
// const allProducts = pruebaProductManager.getProduct(); 
// console.log('Todos los productos:', allProducts); 


// // // Agregar un producto
// const newProduct3 = { 
//   title: '02 Producto prueba',
//   description: 'Este es el segundo producto de prueba',
//   price: 200,
//   thumbnail: 'Sin imagen',
//   codigo: 'abc1234',
//   stock: 25
// };

// pruebaProductManager.addProduct(newProduct3); 
// const allProducts2 = pruebaProductManager.getProduct(); 
// console.log('Todos los productos 02:', allProducts2); 

// console.log(" ------------------------------------------------------------------")
// console.log("Probamos funcion getProductById con ID existente")
// let pruebaGetProductById = pruebaProductManager.getProductById("1")
// console.log(pruebaGetProductById)

//  console.log(" ------------------------------------------------------------------")
// console.log("Probamos funcion UPDATE")

//  let nuevoProducto = { 
//   title: '03 Producto prueba',
//    description: '03 Producto prueba',
//    price: 19.99,
//    thumbnail: 'Sin imagen',
//    codigo: '12345',
//    stock: 10
//  };
//  let pruebaUpddate  = pruebaProductManager.updateProduct("1", nuevoProducto)

// console.log(" ------------------------------------------------------------------")
// console.log("Probamos funcion deleteProduct")

// let pruebadeleteProduct = pruebaProductManager.deleteProduct("1")


export default {ProductManager}; //modulos
