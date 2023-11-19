import fs from "fs"
export class CartManager {

    carrito;
    static ultimoId = 1
    constructor(path){
      this.carrito = [];
        this.path= path;

    }
         
      
    addCarrito = async () => {
        this.carrito = await this.getCarrito();
        this.carrito.push({
          id: this.carrito.length ? this.carrito.length : 0,
          products: [],
        });
      
        this.saveCarrito(this.carrito) 
      };
    // Devuelve el arreglo con todos los produtos creados hasta el momento.
    // Ahora el producto se guarda en un archivo, por lo que debo leerlo con la funcion readFileSync
    getCarrito = async () => {
        try{ 
          
          const resultado = fs.readFileSync(this.path, "utf-8")
           const data = JSON.parse(resultado) 
          
          return (data);
          }
          // Sino encuentra el archivo, retorna un array vacio
          catch(error){
            console.log("getCarritos = async () => {")
            console.log(error);
          }
      }
      // Busca en el arreglo el producto que coincida con el ID, 
      // SI NO coincide el ID, devolver  mensaje con "Not founded"
      
    // Funcion para guardar los datos de los productos en un archivo. Esta recibe una lista de productos del constructor como parametro
    saveCarrito(carrito) { 
        // Es necesario convertir  la lista de productos en una cadena JSON utilizando JSON.stringify() 
        const data = JSON.stringify(carrito); 
        // Guardamos los datos en el archivo de forma síncrona
        fs.writeFileSync(this.path, data); 
      }
// TESTING

    getCarritoById = async (id) => {

        try{
        
        this.carrito = await this.getCarrito(id);
        
        const carritos = this.carrito.find((element) => element.id === id);
        console.log("el id es",carritos )
        if (carritos === undefined) {

            throw new Error(`ID ${id} no encontrado`);
        }
        return carritos
        } 
    catch(error){
        throw new Error(`ID incorrecto`);
        }
    }
    
    //
    getIndexProductos = async (carrito, idProduct) => {
        return carrito.products ? carrito.products.findIndex((e) => e.id === idProduct):-1;
    };


    addProductToCarrito = async (id, idProducto) => {
        this.carrito = await this.getCarrito();
        let carritos = await this.getCarritoById(id);
    
        if (!carritos) {
          let error = new Error("no existe carrito");
          error.statusCode = 400;
          throw error;
        }
        const carritoIndex = this.carrito.findIndex((elemento) => elemento.id === id);
    
        const productIndex = await this.getIndexProductos(carritos,idProducto);
    
        productIndex !== -1
          ? this.carrito[carritoIndex].products[productIndex].quantity++
          : this.carrito[carritoIndex].products.push({
              id: idProducto,
              quantity: 1,
            });
    
        this.saveCarrito(this.carrito) ;
      };
    

}

// TESTING
console.log(" -----------------------    TESTING      -----------------------")




export default {CartManager}; //modulos
