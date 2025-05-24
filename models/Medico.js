const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(URIMysql);

class Medico extends Model {}

Medico.init({

nombre: {
type: DataTypes.STRING,
allowNull: false, 
},
IDMedico: {
type: DataTypes.INTEGER,
allowNull: false, 
primaryKey: true,
},
Profesion: {
type: DataTypes.STRING,
allowNull: false, 
}
}, {

sequelize,
modelName: 'Medico',
tableName: 'Medico',
});