// La configuracion esta en el index que esta en el dao
import { PRODUCTDAO } from "../dao/index.js";
import { USERDAO } from "../dao/index.js";
//Manejo de errores
import CustomError from "../service/CustomError.js";
import EErrors from "../service/enum.js";
import { generateProductErrorInfo } from "../service/info.js";


//Guardamos producto dependiendo si es en memoria o si es en mongo
//Nueva funcion control de errores
async function saveProduct (req,res){
    try {
        const product = req.body;
        if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
            throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
        }
        //Segun profe
        await PRODUCTDAO.save(product);
        res.send(product);
    } catch (error) {
        //tema nuevo, manejo de errores
        if (error instanceof CustomError) {
            const errorInfo = generateProductErrorInfo(error);
            res.status(errorInfo.statusCode).json(errorInfo);
        } else {
            //console.error("Error no controlado:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

//obtenemos productos dependiendo si es en memoria o si es en mongo
async function getAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    const user = req.user;
    const cartId = req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditButton = userRole === 'admin';// Lo ponemos como admin
    res.render ('product',{products:products, user: user, cartId:cartId, showEditButton})
}

// Obtenemos producto por ID dependiendo si es en memoria o si es en mongo
async function getProductById(req,res){
    const pid = req.params.pid;
    const productById = await PRODUCTDAO.getById(pid);
    productById._id = productById._id.toString(); 
    res.render('productdetail', productById);   
}

//Generamos funcion para visualizar todos los productos por el adm, problema!! revisar
async function getAllProductsForAdmin(req,res){
    const products = await PRODUCTDAO.getAll();
    res.render ('updateproducts',{products:products })
}

async function getProductByIdForAdmin(req,res){
    const pid = req.params.pid;
    const productById = await PRODUCTDAO.getById(pid);
    productById._id = productById._id.toString(); 
    res.render ('updateoneproduct',{productById})
}
// Eliminamos producto por ID dependiendo si es en memoria o si es en mongo
async function deletedProduct(req,res){
    const {pid} = req.params;
    const productId = await PRODUCTDAO.delete(pid);
    res.send (productId)
}

// Actualizamos producto por ID dependiendo si es en memoria o si es en mongo
async function updatedProduct(req,res){
    const pid = req.params;
    const productToUpdated = req.body;
    const productUpdated = await PRODUCTDAO.update(pid, productToUpdated);
    res.send (productUpdated)
}
//Exportamos funciones
export {saveProduct,getAllProducts,getProductById, deletedProduct,updatedProduct,getAllProductsForAdmin,getProductByIdForAdmin}

// Funcion para la 3era preentrga
//Guardamos producto dependiendo si es en memoria o si es en mongo
// async function saveProduct (req,res){
//     const product = req.body;
//     await PRODUCTDAO.save(product);
//     res.send(product)
// }