
//Dao con Memory

export default class TicketDao {
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