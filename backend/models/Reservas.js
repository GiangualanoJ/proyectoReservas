const { dbConnection } = require('../config/database');
const { DataTypes } = require('sequelize');

const Reservas = dbConnection.define('Reservas', {
    nombre: {
        type: DataTypes.STRING
    },
    file: {
        type: DataTypes.BLOB
    },
    fecha: {
        type: DataTypes.DATE
    },
    duracion: {
        type: DataTypes.TIME
    },
    salon: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

Reservas.sync({}).then(() => {
    console.log("Tabla Reservas sincronizada correctamente")
}).catch(error => console.log(error))

module.exports =  Reservas;
