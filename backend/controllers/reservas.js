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
        const { nombre, fechaDesde, fechaHasta, horaDevolucion, salonID, file } = req.body;

        const nuevaReserva = new Reservas({
            nombre,
            fechaDesde,
            fechaHasta,
            horaDevolucion,
            salonID,
            file
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
    const id = req.params.id;
    const { nombre, fechaDesde, fechaHasta, horaDevolucion, salonID } = req.body;

    try {
        let reserva = await Reservas.findByPk(id);

        if (!reserva) {
            return res.status(404).json({
                ok: false,
                message: "Reserva no encontrada"
            });
        }

        let file = reserva.file; // Conservar el archivo original si no se proporciona uno nuevo
        if (req.file) {
            file = req.file.filename; // Actualizar el nombre del archivo si se proporciona uno nuevo
        }

        const updatedReserva = await Reservas.update({
            nombre,
            fechaDesde,
            fechaHasta,
            horaDevolucion,
            salonID,
            file // Incluir el campo file en la actualización
        }, {
            where: { id: id }
        });

        if (updatedReserva[0] === 1) {
            // Si la actualización fue exitosa, obtener la reserva actualizada
            reserva = await Reservas.findByPk(id);
            res.json(reserva);
        } else {
            res.status(500).json({
                ok: false,
                message: "No se pudo actualizar la reserva"
            });
        }
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