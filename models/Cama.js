const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3000,
});

class Camas extends Model {}

/*module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('Camas', {
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
  return SomeModel;
};*/

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