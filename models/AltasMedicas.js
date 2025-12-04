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
      type: DataTypes.INTEGER, //IDPaciente del paciente dado de alta
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlanID: {
      type: DataTypes.INTEGER, //IDPlan del plan de atencion posterior creado durante el alta
      allowNull: true
    },
    MedicID: {
      type: DataTypes.INTEGER, //IDUser del medico que dio el alta
      allowNull: true
    }
}, {

sequelize,
modelName: 'AltasMedicas',
tableName: 'altasmedicas',
timestamps: false
});

module.exports = AltasMedicas;