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
}
}, {

sequelize,
modelName: 'habitacion',
tableName: 'habitacion',
timestamps: false
});

module.exports = Habitacion;