const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3000,
});

class Citas extends Model {}

module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDCita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    IDMedico: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Citas',
    tableName: 'Citas',
  });
  return SomeModel;
};

Citas.init({

IDCita: {
type: DataTypes.INTEGER,
primaryKey: true,
},
IDMedico: {
type: DataTypes.INTEGER,
allowNull: false 
},
Tipo: {
type: DataTypes.STRING,
allowNull: false 
},
Fecha: {
type: DataTypes.DATE,
allowNull: false 
}
}, {

sequelize,
modelName: 'Citas',
tableName: 'Citas',
});