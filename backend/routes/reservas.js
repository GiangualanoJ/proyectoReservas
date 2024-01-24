const { dbconnection } = require('../config/database')
const express = require('express')
const UploadFile = require('../middlewares/multer')
const UploadImageToGCS = require('../middlewares/googleCloud')
const { getReserva,
    nuevaReserva,
    updateReserva,
    deleteReserva } = require('../controllers/reservas')

const router = express.Router()

router.get('/', getReserva)
router.post('/nuevaReserva', nuevaReserva)
router.put('/:id', updateReserva)
router.delete('/:id', deleteReserva)

router.post('/uploadImagen', UploadFile(), async (req, res) => {
    console.log(req.file)
    try {
        const fileName = req.file.originalname;
        const imageBuffer = req.file.path;
        const bucketName = 'clientes-proyecto';
        const contentType = req.file.mimetype;

        await UploadImageToGCS(fileName, imageBuffer, bucketName, contentType);

        res.send('Imagen subida exitosamente a Google Cloud Storage');
    } catch (error) {
        console.error('soy el error en uploadImagen hl: ', error);
    }
})


module.exports = router

