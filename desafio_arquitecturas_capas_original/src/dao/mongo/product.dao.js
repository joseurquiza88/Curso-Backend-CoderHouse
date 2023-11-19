import productModel from "./models/product.js";

export default class ProductDao {
    constructor(){}

    async getAll(){
        try{
            const products = await productModel.find();
            return products;
        }catch(error){
            console.log(error)
        }
    }

    async save(newElement){
        try{
            const response = await productModel.create (newElement);
            return response;
        }catch(error){
            console.log(error)
        }
    }
}