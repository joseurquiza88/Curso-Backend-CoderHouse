//import cartModel from "./models/cart.js";
//Dao con Memory
export default class CartDao {
    constructor(){
        this.data= [];//poner la info en array
    }
    async getAll(){
        return this.data;
    }
    async save(newElement){
        this.data.push(newElement)
    }
}