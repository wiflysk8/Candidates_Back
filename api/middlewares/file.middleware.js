const path = require('path');
const multer = require('multer');

// Importaremos las librerías necesarias para la nueva función
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log('filename ->', file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error("Invalid file type");
        cb(error)
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

// Ahora tenemos un nuevo middleware de subida de archivos
const uploadToCloudinary = async (req, res, next) => {
    console.log(req.file);
    if (req.file) {
        try{
            const filePath = req.file.path;
            const image = await cloudinary.uploader.upload(filePath);
            
            // Borramos el archivo local
            await fs.unlinkSync(filePath);

            // Añadimos la propiedad file_url a nuestro Request
            req.file_url = image.secure_url;
            return next();
        }catch(error){
            return next(error)
        }
    } else {
        return next();
    }
};

module.exports = { upload: upload, uploadToCloudinary };