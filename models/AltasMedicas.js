const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.name, process.env.user, process.env.pass, {
host: process.env.host,
dialect: 'mysql',
logging: false,
port: process.env.port,
});

class AltasMedicas extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AltasMedicas', {
    IDAlta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Medicamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CantMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DosisMedicamento: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    TiempoMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'histcirujias',
    timestamps: false
  });
};

AltasMedicas.init({
    IDAlta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Medicamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CantMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DosisMedicamento: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    TiempoMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {

sequelize,
modelName: 'AltasMedicas',
tableName: 'altasmedicas',
timestamps: false
});