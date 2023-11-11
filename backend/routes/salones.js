const express = require('express')
const { getSalon,
    createSalon,
    updateSalon,
    deleteSalon } = require('../controllers/salones')

const router = express.Router()

router.get('/verSalon', getSalon)
router.post('/crearSalon', createSalon)
router.put('/:id', updateSalon)
router.delete('/:id', deleteSalon)

module.exports = router

