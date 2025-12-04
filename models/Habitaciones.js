const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Habitacion extends Model {}

Habitacion.init({
IDHab: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
Tipo: {
type: DataTypes.STRING,
allowNull: false,
},
Ala: {
type: DataTypes.INTEGER,
},
GeneroHab: {
type: DataTypes.STRING, //si hay un paciente en las camas asignadas a la habitacion, GeneroHab adopta ese mismo genero y solo permite pacientes del mismo genero
allowNull: true,
},
}, {

sequelize,
modelName: 'habitacion',
tableName: 'habitacion',
timestamps: false
});

module.exports = Habitacion;