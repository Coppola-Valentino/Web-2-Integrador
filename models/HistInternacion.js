const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
class HistInternacion extends Model {}

HistInternacion.init({
    IDIntern: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER, //conectado al IDPaciente del paciente a internar
      allowNull: true
    },
    AltaID: {
      type: DataTypes.INTEGER, //conectado al IDAlta de altasMedicas (solo si le dan un alta al paciente por esta internacion)
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
      type: DataTypes.INTEGER, //conectado al IDPlan del planAtencion creado para esta internacion
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
      type: DataTypes.INTEGER, //conectado al IDUser del usuario que creo la internacion
      allowNull: true
    }
}, {

sequelize,
modelName: 'HistInternacion',
tableName: 'histinternacion',
timestamps: false
});

module.exports = HistInternacion;