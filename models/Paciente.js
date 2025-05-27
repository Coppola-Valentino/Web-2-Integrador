const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.2', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3000,
});

class Paciente extends Model {}

module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    Historial: {
      type: DataTypes.STRING,
    },
    Genero: {
      type: DataTypes.STRING,
    },
    Citas: {
      type: DataTypes.INTEGER,
    },
    Cama:{
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'paciente',
  });
  return SomeModel;
};

Paciente.init({
IDPaciente: {
type: DataTypes.INTEGER,
primaryKey: true,
},
nombre: {
type: DataTypes.STRING,
allowNull: false 
},
Historial: {
type: DataTypes.STRING,
},
Genero: {
type: DataTypes.STRING,
},
Citas: {
type: DataTypes.INTEGER,
},
Cama:{
type: DataTypes.INTEGER,
},
Historial:{
type: DataTypes.STRING,
}
}, {

sequelize,
modelName: 'Paciente',
tableName: 'paciente',
});