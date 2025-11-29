const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
class HistInternacion extends Model {}

HistInternacion.init({
    IDIntern: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AltaID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FechaInicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Sintomas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Prioridad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'HistInternacion',
tableName: 'histinternacion',
timestamps: false
});

module.exports = HistInternacion;