const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class HistCirujias extends Model {}

HistCirujias.init({
    IDCiru: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Diagnostico: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Resumen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'HistCirujias',
tableName: 'histcirujias',
timestamps: false
});

module.exports = HistCirujias;