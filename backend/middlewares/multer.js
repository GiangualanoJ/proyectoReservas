const multer = require('multer');

function UploadFile() {

    const storage = multer.diskStorage({
        destination: './uploads/',
        filename: function (_req, file, cb) {
            const extension = file.originalname.slice(file.originalname.lastIndexOf('.')); /* esto es para poder colocarle un nombre unico al la imagen */
            // cb(null, Date.now() + extension);
            cb(null, file.originalname);
        }
    })
    
    const upload = multer({ storage: storage }).single('imagen');

    return upload
}

module.exports = UploadFile

