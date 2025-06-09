const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class Paciente extends Model {}

/*module.exports = (sequelize, DataTypes) => {
  const SomeModel = sequelize.define('SomeModel', {
    IDPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    edad: {
     type: DataTypes.INTEGER,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Historial: {
      type: DataTypes.STRING,
    },
    seguro: {
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
};*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('paciente', {
    IDPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Historial: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Seguro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Cita: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    tableName: 'paciente',
    timestamps: false
  });
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
DNI: {
type: DataTypes.INTEGER,
},
Edad: {
type: DataTypes.INTEGER,
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
Seguro: {
type: DataTypes.STRING,
}
}, {

sequelize,
modelName: 'Paciente',
tableName: 'paciente',
});