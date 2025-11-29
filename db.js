require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

module.exports = { sequelize, DataTypes};