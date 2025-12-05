const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Especialidades extends Model {}

Especialidades.init({
    IDEspecialidades: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    }
}, {

sequelize,
modelName: 'Especialidades',
tableName: 'especialidades',
timestamps: false
});

module.exports = Especialidades;