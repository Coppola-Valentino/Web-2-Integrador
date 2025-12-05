const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Ala extends Model {}

Ala.init({
    IDAla: {
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
modelName: 'Ala',
tableName: 'ala',
timestamps: false
});

module.exports = Ala;