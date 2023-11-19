//import cartModel from "./models/cart.js";
export default class CartDao {
    constructor(){
        this.data= [];
    }
    async getAll(){
        return this.data;
    }
    async save(newElement){
        this.data.push(newElement)
    }
}