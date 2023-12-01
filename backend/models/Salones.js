const { dbConnection } = require('../config/database');
const { DataTypes } = require('sequelize');
const  Reservas  = require('./Reservas'); 

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


Salones.hasMany(Reservas, {
    foreignKey: 'salonID',
    as: 'Reservas'
});  

Salones.sync({ alter: true }).then(() => {
    console.log("Tabla Salones sincronizada correctamente");
}).catch((error) => {
    console.log("hubo un error", error);
})

module.exports =  Salones;
 