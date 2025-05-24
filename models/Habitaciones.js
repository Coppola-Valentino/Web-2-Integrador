const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(URIMysql);

class Habitaciones extends Model {}

Habitaciones.init({

IDHabitacion: {
type: DataTypes.INTEGER,
primaryKey: true,
},
IDCama: {
type: DataTypes.INTEGER,
},
Genero: {
type: DataTypes.STRING,
},
Desinfectada: {
type: DataTypes.BOOLEAN,
},
Ala: {
type: DataTypes.INTEGER,    
}
}, {

sequelize,
modelName: 'Habitaciones',
tableName: 'Habitaciones',
});