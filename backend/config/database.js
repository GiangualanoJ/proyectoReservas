const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('eventos', 'root', 'JoseRena1244',
{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = {dbConnection};