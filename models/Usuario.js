const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

class User extends Model {

 async validar(pass) {
  return await bcrypt.compare(pass, this.Pass);
 }

 verAdmin(){
  return this.Rol === 'Admin'
 }

 verMedico(){
  return this.Rol === 'Medico'
 }

 verEnfermero(){
  return this.Rol === 'Enfermero'
 }

 verRecep(){
  return this.Rol === 'Recepcionista'
 }

}

/*module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
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
    tableName: 'user',
    timestamps: false
  });
};*/

User.init({

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
},
}, {

sequelize,
modelName: 'User',
tableName: 'user',
timestamps: false,
hooks: {
  beforeCreate: async (User) => {
    if (User.Pass) {
      const sal = await bcrypt.genSalt(10);
      User.Pass = await bcrypt.hash(User.Pass, sal);
    }
  },
  beforeUpdate: async (User) => {
    if (User.changed('Pass')) {
      const sal = await bcrypt.genSalt(10);
      User.Pass = await bcrypt.hash(User.Pass, sal);
    }
  }
}
});

module.exports = User;