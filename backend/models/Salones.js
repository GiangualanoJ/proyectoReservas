const { dbConnection } = require('../config/database');
const { DataTypes } = require('sequelize');

const Salones = dbConnection.define('Salones', {
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.INTEGER
    },
    capacidad: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
});

Salones.sync({}).then(() => {
    console.log("Tabla Salones sincronizada correctamente")
}).catch(error => console.log(error))

module.exports =  Salones;
