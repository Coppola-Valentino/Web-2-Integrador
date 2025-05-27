const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.2', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3000,
});

class Cama extends Model {}

module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDCama: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    IDHabitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Genero: {
      type: DataTypes.STRING,
    },
    IDPaciente: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Cama',
    tableName: 'Cama',
  });
  return SomeModel;
};

Cama.init({

IDCama: {
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false,
},
IDHabitacion: {
type: DataTypes.INTEGER,
allowNull: false,
},
Genero: {
type: DataTypes.STRING,
},
IDPaciente: {
type: DataTypes.INTEGER,
}
}, {

sequelize,
modelName: 'Cama',
tableName: 'Cama',
});