const { dbconnection } = require('../config/database')
const express = require('express')
const UploadFile = require('../middlewares/multer')
const { getReserva,
    nuevaReserva,
    updateReserva,
    deleteReserva } = require('../controllers/reservas')

const router = express.Router()

router.get('/', getReserva)
router.post('/nuevaReserva', nuevaReserva)
router.put('/:id', updateReserva)
router.delete('/:id', deleteReserva)
router.post('/uploadImagen', UploadFile(), (req, res) => {
    console.log(req.file)
    res.send('Imagen subida')
})

module.exports = router

