const { response } = require('express')
const Salones = require('../models/Salones')

const getSalon = async (req, res = response) => {
    try {

        const salon = await Salones.findAll()
        res.json(salon)

    } catch (error) {
        console.log(error)
    }
} 

const createSalon = async (req, res = response) => {
    try {

        const salon = new Salones(req.body)
        await salon.save()

        res.json({ salon })

    } catch (error) {
        console.log(error)
    }
}


const updateSalon = async (req, res = response) => {

    const id = req.params.id
    const { nombre, precio, capacidad } = req.body

    try {
        const salon = await Salones.findByPk(id)
        console.log(salon)

        if (!salon) {
            return res.status(201).json({
                ok: false,
                message: "salon no encontrado"
            })
        }

        salon.nombre = nombre
        salon.precio = precio
        salon.capacidad = capacidad


        await salon.save()
        res.json(salon)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el salon"
        })
    }

};

const deleteSalon = async (req, res = response) => {

    try {
        const id = req.params.id
        await Salones.destroy({ where: { id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getSalon,
    createSalon,
    updateSalon,
    deleteSalon
}