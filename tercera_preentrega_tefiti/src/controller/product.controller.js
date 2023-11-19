// La configuracion esta en el index que esta en el dao
import { PRODUCTDAO } from "../dao/index.js";
import { USERDAO } from "../dao/index.js";

//Guardamos producto dependiendo si es en memoria o si es en mongo
async function saveProduct (req,res){
    const product = req.body;
    await PRODUCTDAO.save(product);
    res.send(product)
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
    const productToUpdated= req.body;
    const productUpdated = await PRODUCTDAO.update(pid,productToUpdated);
    res.send (productUpdated)
}
//Exportamos funciones
export {saveProduct,getAllProducts,getProductById, deletedProduct,updatedProduct,getAllProductsForAdmin,getProductByIdForAdmin}


