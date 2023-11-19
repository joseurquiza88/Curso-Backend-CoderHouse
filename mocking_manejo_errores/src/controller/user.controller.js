// La configuracion esta en el index que esta en el dao
import { USERDAO } from "../dao/index.js";

//Guardamos usuarios dependiendo si es en memoria o si es en mongo
async function saveUser (req,res){
    const user = req.body;
    await USERDAO.save(user);
    res.send(user)
}
//obtenemos usuarios dependiendo si es en memoria o si es en mongo
async function getAllUsers(req,res){
    const users = await USERDAO.getAll();
    res.send (users)
}
//obtenemos 1 usuario segun ID dependiendo si es en memoria o si es en mongo
async function getUserById(req,res){
    const uid = req.params.uid;
    const userId = await USERDAO.getUserId(uid);
    // console.log (userId);
    return userId;
}
//Exportamos funciones
export {saveUser, getAllUsers, getUserById} 
