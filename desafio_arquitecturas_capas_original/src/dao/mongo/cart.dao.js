import cartModel from "./models/cart.js";

export default class CartDao {
    constructor(){}

    async getAll(){
        try{
            const carts = await cartModel.find();
            return carts;
        }catch(error){
            console.log(error)
        }
    }

    async save(newElement){
        try{
            const response = await cartModel.create (newElement);
            return response;
        }catch(error){
            console.log(error)
        }
    }
}