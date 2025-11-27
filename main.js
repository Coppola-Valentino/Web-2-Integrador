require('dotenv').config()
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const { getUser, logout, auther, reqAuther, reqLv1, reqLv2, reqLv3 } = require('./authent')

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

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'secret session',
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 
  } 
}))

app.use(getUser);

const Paciente = require('./models/Paciente')(sequelize, DataTypes);
const Habitacion = require('./models/Habitaciones')(sequelize, DataTypes);
const Camas = require('./models/Cama')(sequelize, DataTypes);
const User = require('./models/Usuario');

router.get('/', async (req, res) => {
    res.render('Home'); 
});
router.get('/Home', async (req, res) => {
    res.render('Home'); 
});

router.get('/inPac/:id/Historial', reqLv1 , async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    res.render('histo', { pac });
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/inPac/:id/Historial', reqLv1, async (req, res) => {
  try {
   await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
   res.redirect(`/inPac/${req.params.id}/Historial`);
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/inPac', reqAuther , async (req, res) => {
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
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get(`/inPac/:id/internar`, reqLv2 , async (req, res) => {
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
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/inPac/:id/internar', reqLv2 , async (req, res) => {
  try {
    await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
    const pac = await Paciente.findByPk(req.params.id);
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
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habitaciones', reqAuther , async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('Habit', { Habits, camas, pacientes});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/anadir', reqLv3 , async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    res.render('AnadirHab', { Habits, camas, pacientes});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/anadir', reqLv3, async (req, res) => {
  try {
    await Habitacion.create({...req.body, GeneroHab: "Vacio" });
    res.redirect('/Habitaciones');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/anadirCam', reqLv3, async (req, res) => {
  try {
    const habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const HabitsDisp = habits.filter(habit => {
      const camasDeHab = camas.filter(cama => cama.Habitacion === habit.IDHab);
      return camasDeHab.length < 2;
    });

    res.render('AnadirCam', { HabitsDisp, camas }); 
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/anadirCam', reqLv3, async (req, res) => {
  try {
    await Camas.create(req.body);
    res.redirect('/Habitaciones');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/inPac/:id/AltaPac', reqLv2 , async (req, res) => {
 try {
    const pac = await Paciente.findByPk(req.params.id);
    res.render('AltaPac', {pac});
 } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/inPac/:id/AltaPac', reqLv2, async (req, res) => {
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
    console.error(err.message);
    res.redirect('/Error');
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

router.get('/Cama/:id/eliminar', reqLv3,async (req, res) => {
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
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/:id/editar', reqLv1, async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const hab = await Habitacion.findByPk(req.params.id);
    const camas = await Camas.findAll();
    res.render('EditHab', { hab, camas, pacientes});
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/Habit/:id/editar', reqLv1, async (req, res) => {
  try {
   await Habitacion.update(req.body, { where: { IDHab: req.params.id } });
   const camasDeHab = await Camas.findAll({ where: { Habitacion: req.params.id } });
    for (const cama of camasDeHab) {
      const higenizadoValue = req.body[`Higenizado_${cama.IDCamas}`] === "true";
      await cama.update({ Higenizado: higenizadoValue });
    }
   res.redirect('/Habitaciones');
  } catch (err){
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/Habit/:id/eliminar', reqLv3, async (req, res) => {
 try{
  await Camas.destroy({ where: { Habitacion: req.params.id }})
  await Habitacion.destroy({ where: { IDHab: req.params.id } });
  res.redirect('/Habitaciones');
 } catch (err) {
  console.error(err.message);
  res.redirect('/Error');
 }
});

router.get('/Emergencias', reqAuther, async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null);
    res.render('emerg', { Habits, camas, pacientes, dnis});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Emergencias', reqAuther, async (req, res) => {
  try {
    if (req.body.Telefono === '') {
      delete req.body.Telefono;
    }
    let pac = await Paciente.create(req.body);
    res.redirect(`/inPac/${pac.IDPaciente}/internar`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/editar', reqAuther,async (req, res) => {
 try {
  const pac = await Paciente.findByPk(req.params.id);
  const pacientes = await Paciente.findAll(); 
  const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null && dni != pac.DNI);
  res.render('EditPac', { pac, dnis });
 } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
 }
});

router.post('/inPac/:id/editar', reqAuther, async (req, res) => {
 try {
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
 } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
 }
});

/*router.get('/inPac/:id/excluir', reqLv3, async (req, res) => {
 try {
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
 } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
 }
});
*/
router.get('/inPac/anadir', reqAuther, async (req, res) => {
  try{
    const pacientes = await Paciente.findAll();
    const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null);
    res.render('AnadirPac' , { dnis });
  } catch (err) {
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.post('/inPac/anadir', reqAuther, async (req, res) => {
  try {
    if (req.body.Telefono === '') {
      delete req.body.Telefono;
    }
    await Paciente.create(req.body);
    res.redirect('/inPac');
  } catch (err) {
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.get('/Login', async (req, res) => {
  try {
  //const tUSERS = await User.findAll();
  //const USERS = tUSERS.map(u => u.Usuario);
  res.render('Login');
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/Login', async (req, res) => {
  try {
    await auther(req, res, () => {
      res.redirect('/Home');
    });
  } catch (err) {
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.get('/Logout', reqAuther, logout, (req, res) => {
  res.redirect('/Login');
});

router.get('/Users', reqLv3, async (req, res) => {
  try {
    const USERS = await User.findAll();
    res.render('Users', { USERS });
  } catch (err){
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.get('/Users/:id/Eliminar', reqLv3, async (req, res) => {
  try {
    await User.destroy({ where: { IDUser: req.params.id } })
    res.redirect('/Users');
  } catch (err){
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/Users/:id/Editar', reqLv3, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.render('EditUser', { user });
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Users/:id/Editar', reqLv3, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.redirect('/Users');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/Register', reqLv3, async (req, res) => {
  try {
    //const tUSERS = await User.findAll();
    //const USERS = tUSERS.map(u => u.Usuario);
    res.render('Register');
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/Users/Register', reqLv3, async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/Users');
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/Error', async (req, res) => {
  res.render('Error');
});

router.get('/Permiso', async (req, res) => {
  res.render('Permiso');
});

app.use('/', router);

app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    return sequelize.sync(); 
  })
  .catch(err => {
    console.error('DB connection error:', err.message);
  });


module.exports = app;

//const PORT = 3000;
//app.listen(PORT, () => {
//  console.log(`Server running at http://localhost:${PORT}`);
//});