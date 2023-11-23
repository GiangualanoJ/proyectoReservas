const { response } = require('express')
const Reservas = require('../models/Reservas')

const getReserva = async (req, res = response) => {
    try {

        const reserva = await Reservas.findAll()
        res.json(reserva)

    } catch (error) {
        console.log(error)
    }
} /* Obtiene las reservas de la tabla 'reservas' */

const nuevaReserva = async (req, res) => {
    try {
        const { nombre, fecha, duracion, salon } = req.body;
        const { path } = req.file;

        const nuevaReserva = new Reservas({
            nombre,
            fecha,
            duracion,
            salon,
            file: path
        });

        await nuevaReserva.save();

        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al crear la reserva' });
    }
};
 /* Permite crear una nueva reserva */


const updateReserva = async (req, res = response) => {

    const id = req.params.id
    const { nombre, foto, fecha, duracion, salon } = req.body

    try {
        const reserva = await Reservas.findByPk(id)
        console.log(reserva)

        if (!reserva) {
            return res.status(201).json({
                ok: false,
                message: "reserva no encontrada"
            })
        }

        reserva.nombre = nombre
        reserva.foto = foto
        reserva.fecha = fecha
        reserva.duracion = duracion
        reserva.salon = salon


        await reserva.save()
        res.json(reserva)

        console.log(req.body)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la reserva"
        })
    }

}; /* Encuentra la reserva por el id y luego permite actualizarla */

const deleteReserva = async (req, res = response) => {

    try {
        const id = req.params.id
        await Reservas.destroy({ where: { id: id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
} /* Encuentra la reserva por el id y luego la elimina */




module.exports = {
    getReserva,
    nuevaReserva,
    updateReserva,
    deleteReserva
}