const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Paciente extends Model {}

Paciente.init({
  IDPaciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Edad: {
    type: DataTypes.DATE,
    allowNull: true
  },
  DNI: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Seguro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Telefono: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Direccion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Alergias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  PadreID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MadreID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Paciente',
  tableName: 'paciente',
  timestamps: false
});

module.exports = Paciente;