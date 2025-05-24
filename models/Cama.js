const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(URIMysql);

class Cama extends Model {}

Cama.init({

IDCama: {
type: DataTypes.INTEGER,
primaryKey: true,
allowNull: false,
},
IDHabitacion: {
type: DataTypes.INTEGER,
allowNull: false,
},
Genero: {
type: DataTypes.STRING,
},
IDPaciente: {
type: DataTypes.INTEGER,
}
}, {

sequelize,
modelName: 'Cama',
tableName: 'Cama',
});