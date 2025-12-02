const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Camas extends Model {}

Camas.init({
IDCamas: {
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false,
autoIncrement: true
},
Paciente: {
type: DataTypes.INTEGER,
},
Higenizado: {
type: DataTypes.BOOLEAN,
defaultValue: true,
},
Habitacion: {
type: DataTypes.INTEGER,
allowNull: false,
},
}, {

sequelize,
modelName: 'camas',
tableName: 'camas',
timestamps: false
});

module.exports = Camas;