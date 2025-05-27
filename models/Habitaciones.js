const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.2', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3000,
});

class Habitaciones extends Model {}

module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDHabitacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    IDCama: {
      type: DataTypes.INTEGER,
    },
    Genero: {
      type: DataTypes.STRING,
    },
    Desinfectada: {
      type: DataTypes.BOOLEAN,
    },
    Ala: {
      type: DataTypes.INTEGER,    
    }
  }, {
    sequelize,
    modelName: 'Habitaciones',
    tableName: 'Habitaciones',
  });
  return SomeModel;
};

Habitaciones.init({

IDHabitacion: {
type: DataTypes.INTEGER,
primaryKey: true,
},
IDCama: {
type: DataTypes.INTEGER,
},
Genero: {
type: DataTypes.STRING,
},
Desinfectada: {
type: DataTypes.BOOLEAN,
},
Ala: {
type: DataTypes.INTEGER,    
}
}, {

sequelize,
modelName: 'Habitaciones',
tableName: 'Habitaciones',
});