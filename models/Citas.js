const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Citas extends Model {}

Citas.init({
    IDCita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER, //IDUser del medico seleccionado
      allowNull: true
    },
    PacID: {
      type: DataTypes.INTEGER, //conectado al IDPaciente del paciente
      allowNull: true
    }
}, {

sequelize,
modelName: 'Citas',
tableName: 'citas',
timestamps: false
});

module.exports = Citas;