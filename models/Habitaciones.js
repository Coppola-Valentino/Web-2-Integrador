const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Habitacion extends Model {}

Habitacion.init({
IDHab: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
Nombre: {
type: DataTypes.STRING,
allowNull: true,
},
TipoID: {
type: DataTypes.STRING,
allowNull: false,
},
AlaID: {
type: DataTypes.INTEGER,
allowNull: true,
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