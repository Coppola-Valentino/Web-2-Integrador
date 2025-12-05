const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class TipoHab extends Model {}

TipoHab.init({
    IDTipo: {
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
modelName: 'TipoHab',
tableName: 'tipohab',
timestamps: false
});

module.exports = TipoHab;