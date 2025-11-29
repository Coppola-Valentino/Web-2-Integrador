const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Habitacion extends Model {}

Habitacion.init({
IDHab: {
type: DataTypes.INTEGER,
primaryKey: true,
},
Tipo: {
type: DataTypes.STRING,
allowNull: false,
},
Ala: {
type: DataTypes.INTEGER,
},
GeneroHab: {
type: DataTypes.STRING,
allowNull: true,
},
}, {

sequelize,
modelName: 'habitacion',
tableName: 'habitacion',
timestamps: false
});

module.exports = Habitacion;