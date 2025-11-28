const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class HistInternacion extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('histinternacion', {
    IDIntern: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AltaID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FechaInicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Sintomas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Prioridad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'histinternacion',
    timestamps: false
  });
};

HistInternacion.init({
    IDIntern: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AltaID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FechaInicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Sintomas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Prioridad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'HistInternacion',
tableName: 'histinternacion',
timestamps: false
});