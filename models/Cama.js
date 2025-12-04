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
type: DataTypes.INTEGER, //conectado al IDPaciente del paciente que este ocupando la cama
},
Higenizado: {
type: DataTypes.BOOLEAN,
defaultValue: true,
},
Habitacion: {
type: DataTypes.INTEGER, //conectado a la habitacion donde la cama esta
allowNull: false,
},
}, {

sequelize,
modelName: 'camas',
tableName: 'camas',
timestamps: false
});

module.exports = Camas;