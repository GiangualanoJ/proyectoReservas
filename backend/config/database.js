const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('eventos', 'root', 'abmjTrabajoPracticoFinal1234',
{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = { dbConnection };/* 1 */
