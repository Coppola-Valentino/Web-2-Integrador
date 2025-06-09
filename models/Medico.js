const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class Medico extends Model {}

module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDMedico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    Profesion: {
      type: DataTypes.STRING,
      allowNull: false 
    },
  }, {
    sequelize,
    modelName: 'Medico',
    tableName: 'Medico',
  });
  return SomeModel;
};

Medico.init({

nombre: {
type: DataTypes.STRING,
allowNull: false, 
},
IDMedico: {
type: DataTypes.INTEGER,
allowNull: false, 
primaryKey: true,
},
Profesion: {
type: DataTypes.STRING,
allowNull: false, 
}
}, {

sequelize,
modelName: 'Medico',
tableName: 'Medico',
});