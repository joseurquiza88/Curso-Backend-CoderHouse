// Manager de usuario
//Importamos modelo de usuarios
import userModel from "../models/user.model.js";
//Exportamos clase con default con las funciones para gestionar los productos
//Clase para base de datos
export default class UserDao {
    constructor(){} //necesitamos contructo? revisar!!
    //Buscar toda la ingo
    async getAll(){
        try{
            const users = await userModel.find();
            console.log(users, "desde CLASSSS")
            return users;
        }
        catch(error){
            console.log(error)
        }
    }
    //Buscamos usuario por id
    async getUserId(uid)  {
        let result = await userModel.findById({_id:uid});
        return result;
    };
    //Guardamos info
    async save(newElement){
        try{
            const response = await userModel.create(newElement);
            return response;
        }catch(error){
            console.log(error)
        }
    }

  
}