
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('web2.3', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pugs'));


router.get('/', (req, res) => {
    res.render('Home'); 
});
router.get('/Home', (req, res) => {
    res.render('Home'); 
});

const Paciente = require('./models/Paciente')(sequelize, DataTypes);
router.get('/inPac', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('inPac', { paciente: pacientes });
  } catch (err) {
    res.status(500).send('Error fetching pacientes');
  }
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
    res.render('Register'); 
});
router.get('/Turnos', (req, res) => {
    res.render('turn'); 
});


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

router.get('/inPac/anadir', (req, res) => {
  res.render('Anadirpac');
});

router.post('/inPac/anadir', async (req, res) => {
  try {
    await Paciente.create(req.body);
    res.redirect('/inPac');
  } catch (err) {
    res.status(500).send('Error adding paciente: ' + err.message);
  }
});

app.use('/', router);

app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

module.exports = sequelize;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});