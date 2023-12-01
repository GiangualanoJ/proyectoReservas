const { dbConnection } = require('../config/database');
const { DataTypes } = require('sequelize');

const Reservas = dbConnection.define('Reservas', {
    nombre: {
        type: DataTypes.STRING
    },
    file: {
        type: DataTypes.BLOB('long')
    },
    fechaDesde: {
        type: DataTypes.DATE
    },
    fechaHasta: {
        type: DataTypes.DATE
    },
    horaDevolucion: {
        type: DataTypes.TIME
    },
    salonID: {
        type: DataTypes.INTEGER
    }
}, { 
    timestamps: false
});

Reservas.sync({}).then(() => {
    console.log("Tabla Reservas sincronizada correctamente")
}).catch(error => console.log(error))

module.exports =  Reservas;
