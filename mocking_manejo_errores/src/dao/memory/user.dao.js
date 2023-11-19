
//Dao con Memory
export default class UserDao {
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