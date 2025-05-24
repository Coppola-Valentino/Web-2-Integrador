const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(URIMysql);

class Paciente extends Model {}

Paciente.init({
IDPaciente: {
type: DataTypes.INTEGER,
primaryKey: true,
},
nombre: {
type: DataTypes.STRING,
allowNull: false 
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
Cama:{
type: DataTypes.INTEGER,
},
Historial:{
type: DataTypes.STRING,
}
}, {

sequelize,
modelName: 'Paciente',
tableName: 'paciente',
});