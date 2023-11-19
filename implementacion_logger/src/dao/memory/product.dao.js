
//Dao con Memory
export default class ProductDao {
    constructor(){//ver contructor
        this.data= []; //poner la info en array
    }
    async getAll(){
        return this.data;
    }
    async save(newElement){
        this.data.push(newElement)
    }
}