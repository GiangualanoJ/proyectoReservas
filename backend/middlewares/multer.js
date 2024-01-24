const multer = require('multer');

function UploadFile() {

    const storage = multer.diskStorage({
        destination: './uploads/',
        filename: function (_req, file, cb) {
            const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, file.originalname);
        }
    });

    const upload = multer({ storage: storage }).single('imagen');

    return function (req, res, next) {
       
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              
                return res.status(400).json({ message: 'Multer Error' });
            } else if (err) {
              
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            next();
        });
    };
}

module.exports = UploadFile;
