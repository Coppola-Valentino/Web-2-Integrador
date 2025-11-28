const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

class HistEvalFisica extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('histevalfisica', {
    IDEval: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TipoSangre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fisionomia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SignoVital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Mediciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Palpacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Auscultacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Percusion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Etnicidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'histevalfisica',
    timestamps: false
  });
};

HistEvalFisica.init({
    IDEval: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TipoSangre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fisionomia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SignoVital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Mediciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Palpacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Auscultacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Percusion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Etnicidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'HistEvalFisica',
tableName: 'histevalfisica',
timestamps: false
});