const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class User extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    IDUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Usuario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Pass: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Rol: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'User',
    timestamps: false
  });
};

User.init({

IDUser: {
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false,
},
Usuario: {
type: DataTypes.STRING,
allowNull: true
},
Pass: {
type: DataTypes.STRING,
allowNull: true
},
Rol: {
type: DataTypes.STRING,
allowNull: true
},
}, {

sequelize,
modelName: 'User',
tableName: 'User',
});