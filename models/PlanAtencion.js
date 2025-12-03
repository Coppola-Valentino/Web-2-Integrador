const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class PlanAtencion extends Model {}

PlanAtencion.init({
IDPlan: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
PacID: {
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
Intervenciones: {
type: DataTypes.STRING,
allowNull: true
},
Cuidados: {
type: DataTypes.STRING,
allowNull: true
},
Tratamiento: {
type: DataTypes.STRING,
allowNull: true
},
Terapia: {
type: DataTypes.STRING,
allowNull: true
},
TipoDePlan:{
type: DataTypes.STRING,
allowNull: true
},
MedicID: {
type: DataTypes.INTEGER,
allowNull: true
}
}, {

sequelize,
modelName: 'PlanAtencion',
tableName: 'planatencion',
timestamps: false
});

module.exports = PlanAtencion;