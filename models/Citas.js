const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(URIMysql);

class Citas extends Model {}

Citas.init({

IDCita: {
type: DataTypes.INTEGER,
primaryKey: true,
},
IDMedico: {
type: DataTypes.INTEGER,
allowNull: false 
},
Tipo: {
type: DataTypes.STRING,
allowNull: false 
},
Fecha: {
type: DataTypes.DATE,
allowNull: false 
}
}, {

sequelize,
modelName: 'Citas',
tableName: 'Citas',
});