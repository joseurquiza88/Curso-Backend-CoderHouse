//iniciamos multer
import multer from 'multer';
import path from 'path';
import dotenv from "dotenv";

// Configuración de almacenamiento para diferentes carpetas
const storage = (folderName) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, `uploads/${folderName}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Middleware de Multer 
export const uploadProfileImage = multer({ storage: storage('profiles') });
export const uploadProductImage = multer({ storage: storage('products') });
export const uploadDocument = multer({ storage: storage('documents') });