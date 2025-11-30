const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
class Medicamento extends Model {}

Medicamento.init({
    IDMedicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Dosis: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Tiempo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'Medicamento',
tableName: 'medicamento',
timestamps: false
});

module.exports = Medicamento;