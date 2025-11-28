const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

class PlanAtencion extends Model {}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('planatencion', {
    IDPlan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PacID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Medicamento: {
      type: DataTypes.String,
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
    Tratamiento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Terapia: {
      type: DataTypes.STRING,
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
    tableName: 'planatencion',
    timestamps: false
  });
};

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
Medicamento: {
type: DataTypes.STRING,
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
Tratamiento: {
type: DataTypes.STRING,
allowNull: true
},
Terapia: {
type: DataTypes.STRING,
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
modelName: 'PlanAtencion',
tableName: 'planatencion',
timestamps: false
});