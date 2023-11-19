// La configuracion esta en el index que esta en el dao
import { userService } from "../repositories/service.js";
import multer from 'multer';
//Guardamos usuarios dependiendo si es en memoria o si es en mongo

// Configuración para imagenes del perfil
const profileImageUpload = multer({ dest: 'api/users/upload/profile/' });
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
// -------- Nuevas funciones
// Funcion para subir imagen de perfil
  const uploadProfileImage = async (req, res) => {
    try {
      const userId = req.params.uid;
      //Imagenes
      profileImageUpload.single('profileImage')(req, res, async (err) => {
        if (err) {
          // Manejar errores
          res.status(500).send('Error! por favor verifique la imagen de perfil');
        } else {
          // Generamos ruta temporal del archivo
          const imagePath = req.file.path; 
          // Función upAvatarUser segun profe
          try {
            await userService.upAvatarUser(userId, imagePath);
            res.status(200).send('Perfil completo');
          } catch (error) {
            // Manejo de errores
            res.status(500).send('Error al actualizar la imagen de perfil en la base de datos');
          }
        }
      });
    } catch (error) {
      // Manejar errores generales
      res.status(500).send('Error interno en el servidor');
    }
  };
  
  
  // Funcion para subir documentos
  const uploadDocument = async (req, res) => {
    try {
      const userId = req.params.uid;
      const user = await userService.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      // Procesar cada archivo y actualizar el modelo del usuario
      req.files.forEach(file => {
        const documentType = file.fieldname;
        user.documents.push({
          name: file.originalname,
          reference: `link/al/documento/${file.originalname}`
        });
      });
      // Guardar los cambios en el usuario
      await userService.uploadDoc(uid,);
  
      return res.status(200).json({ message: "Carga de archivos exitosa" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
// Funcion para generar el perfil y renderizarlo
  const getProfile = async(req,res)=>{
    const userId = req.params.uid;
    const profile = await userService.getUserById(userId);
    res.render('profile',{profile:profile})
  }
  //subir documentos y renderizar
  const goUpDocument = async(req,res)=>{
    const uid = req.params.uid;
    const userId = await userService.getUserById(uid);
    res.render ('updocument',{userId})
  };

  export {saveUser,getAllUsers,getUserById,changeRoleUser,getUserForChange,getUserByEmail,goUpDocument,uploadProfileImage,uploadDocument,getProfile}
