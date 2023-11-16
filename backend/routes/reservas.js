const { dbconnection } = require('../config/database')
const express = require('express')
const Reservas = require('../models/Reservas')
const storage = require('../config/multer')
const multer = require('multer')
const { getReserva,
    nuevaReserva,
    updateReserva,
    deleteReserva } = require('../controllers/reservas')

const uploader = multer({ storage })

const router = express.Router()

router.get('/', getReserva)
router.post('/nuevaReserva', nuevaReserva)
router.put('/:id', updateReserva)
router.delete('/:id', deleteReserva)
router.post('/imagen', uploader.single('file'), async (req, res) => {
    const { file, body } = req

    if (file && body) {
        const newImage = new Reservas({
            urlFile: `http://localhost:3001/reservas/${file.fieldname}`,
        })

        await newImage.save()
        res.json({
            newImage: newImage
        })
    }
})
module.exports = router

