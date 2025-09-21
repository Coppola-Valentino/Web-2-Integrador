const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class Paciente extends Model {}

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
    Motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Sintoma: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Prioridad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    EvaluacionFisica: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PlanAtencion: {
      type: DataTypes.STRING,
      allowNull: true
    }
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
},
Motivo: {
type: DataTypes.STRING,
},
Sintoma: {
type: DataTypes.STRING,
},
Prioridad: {
type: DataTypes.STRING,
},
EvaluacionFisica: {
type: DataTypes.STRING,
},
PlanAtencion: {
type: DataTypes.STRING,
},
Telefono: {
  type: DataTypes.INTEGER,
},
Direccion: {
  Type: DataTypes.STRING,
},
AnteFamiliar: {
  Type: DataTypes.STRING,
}
}, {

sequelize,
modelName: 'Paciente',
tableName: 'paciente',
});