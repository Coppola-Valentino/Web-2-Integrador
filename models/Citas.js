const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

class Citas extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Citas', {
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
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'citas',
    timestamps: false
  });
};

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
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'Citas',
tableName: 'citas',
timestamps: false
});