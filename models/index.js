'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const router = require('express').Router();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const app = express();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pugs'));

router.get('/', (req, res) => {
    res.render('Home'); 
});
router.get('/Home', (req, res) => {
    res.render('Home'); 
});
router.get('/inPac', (req, res) => {
    res.render('inPac'); 
});
router.get('/Emergencias', (req, res) => {
    res.render('emerg'); 
});
router.get('/Login', (req, res) => {
    res.render('login'); 
});
router.get('/Adm', (req, res) => {
    res.render('Adm'); 
});
router.get('/Register', (req, res) => {
    res.render('Regis'); 
});
router.get('/Turnos', (req, res) => {
    res.render('turn'); 
});

app.use('/', router);

router.get('/inPac/:id/editar', async (req, res) => {
  const pac = await Paciente.findByPk(req.params.id);
  res.render('EditPac', { pac });
});

router.post('/inPac/:id/editar', async (req, res) => {
  await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
  res.redirect('/inPac');
});

router.get('/inPac/:id/excluir', async (req, res) => {
  await Paciente.destroy({ where: { IDPaciente: req.params.id } });
  res.redirect('/inPac');
});

router.get('/inPac/añadir', (req, res) => {
  res.render('Añadirpac');
});

router.post('/inPac/añadir', async (req, res) => {
  await Paciente.create(req.body);
  res.redirect('/inPac');
});
app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
