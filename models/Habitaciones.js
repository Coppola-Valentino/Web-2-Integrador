const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

class Habitacion extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Habitacion', {
    IDHab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Ala: {
      type: DataTypes.INTEGER,
    },
    GeneroHab: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'habitacion',
    timestamps: false
  });
};

Habitacion.init({

IDHab: {
type: DataTypes.INTEGER,
primaryKey: true,
},
Tipo: {
type: DataTypes.STRING,
allowNull: false,
},
Ala: {
type: DataTypes.INTEGER,
},
GeneroHab: {
type: DataTypes.STRING,
allowNull: true,
},
}, {

sequelize,
modelName: 'habitacion',
tableName: 'habitacion',
timestamps: false
});