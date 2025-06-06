
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
const Habitacion = require('./models/Habitaciones')(sequelize, DataTypes);
const Camas = require('./models/Cama')(sequelize, DataTypes);


router.get('/inPac', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('inPac', { paciente: pacientes, Habits, camas });
  } catch (err) {
    res.status(500).send('Error fetching pacientes');
  }
});
router.get(`/inPac/:id/internar`, async (req, res) => {
  try {
    const pacientesS = await Paciente.findByPk(req.params.id);
    const pacientesT = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('Inter', { pacT: pacientesT, pacS: pacientesS, Habits, camas });
  } catch (err) {
    res.status(500).send('Error fetching data for internar');
  }
});
router.post('/inPac/:id/internar', async (req, res) => {
  const pac = await Paciente.findByPk(req.params.id);
  try {
    await Camas.update(
      { Paciente: null },
      { where: { Paciente: pac.IDPaciente } }
    );

    await Camas.update(
      { Paciente: pac.IDPaciente},
      { where: { IDCamas: req.body.Cama } }
    );
    res.redirect('/inPac');
  } catch (err) {
    res.status(500).send('Error with Internation: ' + err.message);
  }
});

router.get('/Habitaciones', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('Habit', { Habits, camas, pacientes});
  } catch (err) {
    res.status(500).send('Error fetching habitaciones');
  }
});
router.get('/Habit/anadir', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('AnadirHab', { Habits, camas, pacientes});
  } catch (err) {
    res.status(500).send('Error fetching habitaciones');
  }
});
router.post('/Habit/anadir', async (req, res) => {
  try {
    await Habitacion.create(req.body);
    res.redirect('/Habitaciones');
  } catch (err) {
    res.status(500).send('Error adding Habitacion: ' + err.message);
  }
});
router.get('/Habit/anadirCam', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('AnadirCam', { Habits, camas, pacientes});
  } catch (err) {
    res.status(500).send('Error fetching habitaciones');
  }
});
router.post('/Habit/anadirCam', async (req, res) => {
  try {
    await Camas.create(req.body);
    res.redirect('/Habitaciones');
  } catch (err) {
    res.status(500).send('Error adding cama: ' + err.message);
  }
});

router.get('/Cama/:id/eliminar', async (req, res) => {
 try {
    await Camas.destroy({ where: { IDCamas: req.params.id } });
    res.redirect('/Habitaciones');
  } catch (err) {
    res.status(500).send('Error deleting cama: ' + err.message);
  }
});

router.get('/Habit/:id/editar', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const hab = await Habitacion.findByPk(req.params.id);
    const camas = await Camas.findAll();
    res.render('EditHab', { hab, camas, pacientes});
  } catch (err) {
    res.status(500).send('Error fetching habitaciones');
  }
});
router.post('/Habit/:id/editar', async (req, res) => {
  await Habitacion.update(req.body, { where: { IDHab: req.params.id } });
   const camasDeHab = await Camas.findAll({ where: { Habitacion: req.params.id } });
    for (const cama of camasDeHab) {
      const higenizadoValue = req.body[`Higenizado_${cama.IDCamas}`] === "true";
      await cama.update({ Higenizado: higenizadoValue });
    }
  res.redirect('/Habitaciones');
});
router.get('/Habit/:id/eliminar', async (req, res) => {
  await Habitacion.destroy({ where: { IDHab: req.params.id } });
  res.redirect('/Habitaciones');
});
router.get('/Emergencias', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('emerg', { Habits, camas, pacientes});
  } catch (err) {
    res.status(500).send('Error fetching');
  }
});

router.post('/Emergencias', async (req, res) => {
  try {
    let pac = await Paciente.create(req.body);
    res.redirect(`/inPac/${pac.IDPaciente}/internar`);
  } catch (err) {
    res.status(500).send('Error with emergencia: ' + err.message);
  }
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
  const pac = await Paciente.findByPk(req.params.id);
  await Camas.update(
    { Paciente: null },
    { where: { Paciente: pac.IDPaciente } }
  );
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