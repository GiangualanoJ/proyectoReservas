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

        const reserva = new Reservas(req.body)
        await reserva.save()

        res.json({ reserva })

    } catch (error) {
        console.log(error)
    }
};
/* Permite crear una nueva reserva */

const updateReserva = async (req, res = response) => {
    const id = req.params.id;
    const { nombre, fechaDesde, fechaHasta, horaDevolucion, salonID, imagen } = req.body;

    try {
        const reserva = await Reservas.findByPk(id)
        console.log(reserva)

        if (!reserva) {
            return res.status(201).json({
                ok: false,
                message: "reserva no encontrado"
            })
        }

        reserva.nombre = nombre,
        reserva.fechaDesde = fechaDesde,
        reserva.fechaHasta = fechaHasta,
        reserva.horaDevolucion = horaDevolucion,
        reserva.salonID = salonID,
        reserva.imagen = imagen

        await reserva.save()
        res.json(reserva)


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la reserva"
        });
    }
};

/* Encuentra la reserva por el id y luego permite actualizarla */

const deleteReserva = async (req, res = response) => {

    try {
        const id = req.params.id
        await Reservas.destroy({ where: { id: id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
} /* Encuentra la reserva por el id y luego la elimina */


const fs = require('fs');
const path = require('path');

const returnImagen = async (req, res = response) => {
    const uploadFolder = path.join(__dirname, '../uploads');

    try {

        // Lee el contenido de la carpeta de uploads
        fs.readdir(uploadFolder, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al leer la carpeta de uploads' });
            }

            // Filtra solo los archivos de imagen
            const imageFiles = files.filter(file => {
                const fileExtension = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
            });

            // Envía la lista de nombres de archivo al front-end
            res.json({ images: imageFiles });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al leer la carpeta de uploads' });
    }
}




module.exports = {
    getReserva,
    nuevaReserva,
    updateReserva,
    deleteReserva,
    returnImagen
}