// La configuracion esta en el index que esta en el dao
import { CARTDAO } from "../dao/index.js";
// Guardamos carrito
async function saveCart(req,res){
    const cart= req.body;
    await CARTDAO.save(cart);
    res.send(cart)
}
//Obtenemos todos los carritos
async function getAllCarts(req,res){
    const carts = await CARTDAO.getAll();
    res.send (carts)
}


async function crearCarrito(req, res) {
    const carrito = {
        products: []
    }
    let result = await CARTS_DAO.saveCart(carrito)
    res.json({ message: "Carrito creado correctamente", result })
}

async function getCarritoById(req, res) {
    try {
        const { cid } = req.params
        let result = await CARTS_DAO.getCartById(cid)
        res.json({ message: "Carrito seleccionado", result })
    } catch (err) {
        console.log(err)
    }
}

async function saveProductInCart(req, res) {
    try {
        const { cid, pid } = req.params;
        const result = await CARTS_DAO.saveProductCart(cid, pid)
        res.json({ status: "Success", message: "Ok", result })
    } catch (err) {
        console.log(err)
    }
}

async function updateCarrito(req, res) {
    try {
        const { cid } = req.params
        const { data } = req.body
        const result = await CARTS_DAO.updateCart(cid, data)
        res.status(201).json({ "message": "Carrito actualizado", result })
    } catch (err) {
        console.log(err)
    }
}

async function updateQuantityProductsCarrito(req, res) {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const result = await CARTS_DAO.updateQuantityProductsCart(cid, pid, cantidad)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

async function deleteProductsCarrito(req, res) {
    try {
        const { cid } = req.params
        const result = await CARTS_DAO.deleteProductsCart(cid)
        res.json({ status: result, message: "Ok" })
    } catch (err) {
        console.log(err)
    }
}

async function deleteProductCarrito(req, res) {
    try {
        const { cid, pid } = req.params
        console.log(cid, pid)
        const result = await CARTS_DAO.deleteProductCart(cid, pid)
        res.json({ status: result, message: "Ok" })
    } catch (err) {
        console.log(err)
    }
}

export { crearCarrito, getCarritoById, saveProductInCart, updateCarrito, updateQuantityProductsCarrito, deleteProductsCarrito, deleteProductCarrito }





//export {saveCart,getAllCarts}