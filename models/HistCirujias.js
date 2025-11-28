const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

class HistCirujias extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HistCirujias', {
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
    tableName: 'histcirujias',
    timestamps: false
  });
};

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