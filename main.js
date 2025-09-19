
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'public')));

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


router.get('/inPac/:id/Historial', async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    res.render('histo', { pac });
  } catch (err) {
    res.status(500).send('Error fetching paciente: ' + err.message);
  }
});

router.post('/inPac/:id/Historial', async (req, res) => {
  try {
   await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
   res.redirect(`/inPac/${req.params.id}/Historial`);
  } catch (err) {
    res.status(500).send('Error adding historial: ' + err.message);
  }
});

router.get('/inPac', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const camas = await Camas.findAll();
    const Habits = await Habitacion.findAll();
    const pacienteData = pacientes.map(pac => {
     const cama = camas.find(c => c.Paciente === pac.IDPaciente);
     const habitacion = cama ? Habits.find(h => h.IDHab === cama.Habitacion) : null;
     return {
      ...pac.toJSON(),
      cama,
      habitacion
  };
  });

  res.render('inPac', { paciente: pacienteData, camas, Habits });
  } catch (err) {
    res.status(500).send('Error fetching pacientes');
  }
});
router.get(`/inPac/:id/internar`, async (req, res) => {
  try {
    const pacS = await Paciente.findByPk(req.params.id);
    const pacT = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const camasDisponibles = camas.filter(cama => {
     const hab = Habits.find(h => h.IDHab === cama.Habitacion);
     return (
      (cama.Paciente === null || cama.Paciente === undefined) &&
      cama.Higenizado === true &&
      (hab?.GeneroHab.toLowerCase() === pacS.Genero.toLowerCase() || hab?.GeneroHab === "Vacio")
  );
}).map(cama => {
        const hab = Habits.find(h => h.IDHab === cama.Habitacion);
        return {
          ...cama.toJSON(),
          habitacion: hab,
        };
      });
    res.render('Inter', { pacT, pacS, Habits, camas, camasDisponibles });
  } catch (err) {
    res.status(500).send('Error fetching data for internar');
  }
});
router.post('/inPac/:id/internar', async (req, res) => {
  await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
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
    const cama = await Camas.findByPk(req.body.Cama);
    await Habitacion.update(
      { GeneroHab: pac.Genero},
      { where: { IDHab: cama.Habitacion} }
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
    await Habitacion.create({...req.body, GeneroHab: "Vacio" });
    res.redirect('/Habitaciones');
  } catch (err) {
    res.status(500).send('Error adding Habitacion: ' + err.message);
  }
});
router.get('/Habit/anadirCam', async (req, res) => {
  try {
    const habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const HabitsDisp = habits.filter(habit => {
      const camasDeHab = camas.filter(cama => cama.Habitacion === habit.IDHab);
      return camasDeHab.length < 2;
    });

    res.render('AnadirCam', { HabitsDisp, camas }); 
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

router.get('/inPac/:id/AltaPac', async (req, res) => {
 try {
    const pac = await Paciente.findByPk(req.params.id);
    res.render('AltaPac', {pac});
 } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/inPac/:id/AltaPac', async (req, res) => {
 try {
  const cama = await Camas.findOne({ where: {Paciente: req.params.id} });
  const hab = await Habitacion.findByPk(cama.Habitacion)
  const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
  await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
  await Camas.update(
    { Paciente: null },
    { where: { Paciente: req.params.id } }
  );
  if (camasDeHab.every(c => c.Paciente === null)) {
    await Habitacion.update(
      { GeneroHab: "Vacio" },
      { where: { IDHab: hab.IDHab } }
    );
  }
  res.redirect('/inPac');
 } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

/*router.get('/Cama/:id/desocupar', async (req, res) => {
  await Camas.update(
    { Paciente: null },
    { where: { IDCamas: req.params.id } }
  );
  const cama = await Camas.findByPk(req.params.id);
  const hab = await Habitacion.findByPk(cama.Habitacion)
  const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
  if (camasDeHab.every(c => c.Paciente === null)) {
    await Habitacion.update(
      { GeneroHab: "Vacio" },
      { where: { IDHab: hab.IDHab } }
    );
  }
  res.redirect('/Habitaciones');
});*/

router.get('/Cama/:id/eliminar', async (req, res) => {
 try {
   const cama = await Camas.findByPk(req.params.id);
   await Camas.destroy({ where: { IDCamas: req.params.id } });
   const hab = await Habitacion.findByPk(cama.Habitacion)
   const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
   if (camasDeHab.length === 0 || camasDeHab.every(c => c.Paciente === null)) {
    await Habitacion.update(
      { GeneroHab: "Vacio" },
      { where: { IDHab: hab.IDHab } }
    );
  }
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
  await Camas.destroy({ where: { Habitacion: req.params.id }})
  await Habitacion.destroy({ where: { IDHab: req.params.id } });
  res.redirect('/Habitaciones');
});
router.get('/Emergencias', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null);
    res.render('emerg', { Habits, camas, pacientes, dnis});
  } catch (err) {
    res.status(500).send('Error fetching');
  }
});

router.post('/Emergencias', async (req, res) => {
  try {
    let pac = await Paciente.create(req.body);
    res.redirect(`/inPac/${pac.IDPaciente}/internar`);
  } catch (err) {
    res.status(500).send('Error adding paciente: ' + err.message);
  }
});

router.get('/inPac/:id/editar', async (req, res) => {
  const pac = await Paciente.findByPk(req.params.id);
  const pacientes = await Paciente.findAll(); 
  const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null && dni != pac.DNI);
  res.render('EditPac', { pac, dnis });
});

router.post('/inPac/:id/editar', async (req, res) => {
  await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
  const pac = await Paciente.findByPk(req.params.id);
  const cam = await Camas.findAll({ where: { Paciente: pac.IDPaciente } });
  if(cam.length > 0){
   for (const cama of cam){
    const hab = await Habitacion.findByPk(cama.Habitacion);
    const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
    if(camasDeHab.length === 1){
     await Habitacion.update(
      { GeneroHab: pac.Genero},
      { where: { IDHab: cama.Habitacion} }
     );
    } else {
      for(const cam2 of camasDeHab){
        if(cam2.Paciente !== pac.IDPaciente){
          const pac2 = await Paciente.findByPk(cam2.Paciente);
          if(pac2 !== null){
           if(pac2.Genero !== pac.Genero){
              await Camas.update(
               { Paciente: null },
               { where: { Paciente: pac.IDPaciente } }
            );
          }
         }else{
          await Habitacion.update(
          { GeneroHab: pac.Genero},
          { where: { IDHab: cama.Habitacion} }
          );
         }
        }
      }
    }
   }
  }
  res.redirect('/inPac');
});

router.get('/inPac/:id/excluir', async (req, res) => {
  const pac = await Paciente.findByPk(req.params.id);
  const cam = await Camas.findAll({ where: { Paciente: pac.IDPaciente } });
  for (const cama of cam) {
    await cama.update({ Paciente: null });
    const hab = await Habitacion.findByPk(cama.Habitacion);
    const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
    if (camasDeHab.length > 0 && camasDeHab.every(c => c.Paciente === null)) {
      await Habitacion.update(
        { GeneroHab: "Vacio" },
        { where: { IDHab: hab.IDHab } }
      );
    }
  }
  await Paciente.destroy({ where: { IDPaciente: req.params.id } });
  res.redirect('/inPac');
});

router.get('/inPac/anadir', async (req, res) => {
  try{
    const pacientes = await Paciente.findAll();
    const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null);
    res.render('AnadirPac' , { dnis });
  } catch (err) {
    res.status(500).send('Error fetching pacientes: ' + err.message);
  }
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

sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    return sequelize.sync(); 
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });


module.exports = app;

//const PORT = 3000;
//app.listen(PORT, () => {
//  console.log(`Server running at http://localhost:${PORT}`);
//});