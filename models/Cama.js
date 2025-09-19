const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class Camas extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cama', {
    IDCamas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Paciente: {
      type: DataTypes.INTEGER
    },
    Higenizado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    Habitacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'camas',
    timestamps: false
  });
};

Camas.init({

IDCamas: {
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false,
},
Paciente: {
type: DataTypes.INTEGER,
},
Higenizado: {
type: DataTypes.BOOLEAN,
defaultValue: true,
},
Habitacion: {
type: DataTypes.INTEGER,
allowNull: false,
},
}, {

sequelize,
modelName: 'camas',
tableName: 'camas',
});