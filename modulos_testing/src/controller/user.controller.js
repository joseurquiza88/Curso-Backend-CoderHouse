// La configuracion esta en el index que esta en el dao
// import { USERDAO } from "../dao/index.js";
import { userService } from "../repositories/service.js";
//Guardamos usuarios dependiendo si es en memoria o si es en mongo
const saveUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: "error",
        error: "Faltan datos, completar",
      });
    }
    try {
      // Crear un nuevo usuario
      const newUser = new User({ first_name, last_name,  email, age, password});
      // Carrito vacío para el nuevo usuario
      const newCart = new Cart();
      await newCart.save();
      newUser.cart = newCart._id;
      // Rol predeterminado como 'user'
      newUser.role = 'user';
      const createdUser = await userService.createUser(newUser);
      res.status(201).json({
        status: "success",
        message: "Usuario creado exitosamente",
        user: createdUser,
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({
        status: "error",
        error: "Error al crear usuario",
      });
    }
  };
//obtenemos usuarios 
async function getAllUsers(req,res){
    //const users = await USERDAO.getAll();
    let users = await userService.getAllUsers();
    if (!users)
      return res
        .status(500)
        .send({
          status: "error",
          error: "Internal error",
        });
    res.send({ status: "Success", payload: users });
  };
//obtenemos 1 usuario segun ID d
async function getUserById(req,res){
    const uid = req.params.uid;
    const userId = await userService.getUserById(uid);
    res.send (userId)
}
//obtenemos 1 usuario segun ID para cambiar el rol
const getUserForChange = async(req,res)=>{
    const uid = req.params.uid;
    const userId = await userService.getUserById(uid);
    res.render ('changerole',{userId})
  }
  //Cambiar rol
  const changeRoleUser = async(req,res)=>{
    const uid = req.params.uid;
    const {newRole} = req.body;
    const user = await userService.updateUser(uid, newRole);
    res.send (user)
  }
  //Obtener usuario por email
  const getUserByEmail = async(req,res)=>{
    const email = req.params.userEmail;
    const userId = await userService.getUserIdByEmail(email);
    res.send (userId)
  }


//Exportamos funciones
export {saveUser,getAllUsers,getUserById,changeRoleUser,getUserForChange,getUserByEmail}
