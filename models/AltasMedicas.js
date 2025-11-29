const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
class AltasMedicas extends Model {}

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

module.exports = AltasMedicas;