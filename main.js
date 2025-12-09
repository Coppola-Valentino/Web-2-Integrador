require('dotenv').config()
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const { getUser, logout, auther, reqAuther, reqMed, reqRec, reqAdm, reqNoAdm, reqMedYEnf, reqEnfYRec, reqAdmYEnf} = require('./authent')

const { sequelize } = require('./db');

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

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync();

//Modelos

const Paciente = require('./models/Paciente');
const Habitacion = require('./models/Habitaciones');
const Camas = require('./models/Cama');
const PlanAtencion = require('./models/PlanAtencion');
const HistInternacion = require('./models/HistInternacion');
const AltasMedicas = require('./models/AltasMedicas');
const HistEvalFisica = require('./models/HistEvalFisica');
const Citas = require('./models/Citas');
const HistCirujias = require('./models/HistCirujias');
const Medicamento = require('./models/Medicamento')
const User = require('./models/Usuario');
const Ala = require('./models/Ala');
const Especialidades = require('./models/Especialidades');
const TipoHab = require('./models/TipoHab');

//Rutas

router.get('/', async (req, res) => {
    res.render('Home'); 
});
router.get('/Home', async (req, res) => {
    res.render('Home'); 
});

router.get('/inPac/:id/Historial', reqMedYEnf , async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    res.render('histo', { pac });
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/inPac/:id/Historial', reqMedYEnf, async (req, res) => {
  try {
   await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
   res.redirect(`/inPac/${req.params.id}/Historial`);
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/inPac', reqNoAdm , async (req, res) => {
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

router.get(`/inPac/:id/internar`, reqMed , async (req, res) => {
  try {
    const pacS = await Paciente.findByPk(req.params.id);
    const pacT = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const tipos = await TipoHab.findAll();
    const alas = await Ala.findAll();
    const camasDisponibles = camas.filter(cama => {
     //const hab = Habits.find(h => h.IDHab === cama.Habitacion);
     const cam = camas.filter(c => c.Habitacion === cama.Habitacion && c.IDCamas !== cama.IDCamas)
     let pac = null;
     if (cam.length > 0){
      const ca = cam[0];
      if(ca.Paciente != null){
        pac = pacT.find(c => c.IDPaciente === ca.Paciente);
      }
     }
     return (
      (cama.Paciente === null || cama.Paciente === undefined) && cama.Higenizado === true && (!pac || (pac?.Genero.toLowerCase() === pacS.Genero.toLowerCase()))
  );
}).map(cama => {
        const hab = Habits.find(h => h.IDHab === cama.Habitacion);
        const tipo = tipos.find(t => t.IDTipo === hab.TipoID);
        const ala = alas.find(a => a.IDAla === hab.AlaID);
        return {
          ...cama.toJSON(),
          Habitacion: hab,
          Ala: ala,
          Tipo: tipo,
        };
      });
    res.render('Inter', { pacT, pacS, Habits, camas, camasDisponibles });
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/inPac/:id/internar', reqMed , async (req, res) => {
  try {
    await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
    const pac = await Paciente.findByPk(req.params.id);
    const int = await HistInternacion.create({
      PacID: pac.IDPaciente,
      FechaInicio: Sequelize.literal('CURRENT_DATE'),
      FechaFin: new Date(),
      Motivo: req.body.Motivo,
      Sintomas: req.body.Sintoma,
      Prioridad: req.body.Prioridad,
      MedicID: req.session.IDUser,
      AltaID: null,
      PlanID: null
    })
    await Camas.update(
      { Paciente: null },
      { where: { Paciente: pac.IDPaciente } }
    );
    await Camas.update(
      { Paciente: pac.IDPaciente},
      { where: { IDCamas: req.body.Cama } }
    );
    const cama = await Camas.findByPk(req.body.Cama);
    /*await Habitacion.update(
      { GeneroHab: pac.Genero},
      { where: { IDHab: cama.Habitacion} }
    );*/
    res.redirect(`/inPac/${pac.IDPaciente}/AnadirAtencion/${int.IDIntern}?tipo=Preliminar`);
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/inPac/:id/AnadirAtencion/:idd', reqMed, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);  
  const int = await HistInternacion.findByPk(req.params.idd);
  const tipo = req.query.tipo || 'Preliminar';
  res.render('AnadirAtencion', {int, pac, tipo});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/AnadirAtencion/:idd', reqMed, async (req, res) => {
  try {
  const Tipo = req.body.tipo || req.query.tipo || 'Posterior';
  const plan = await PlanAtencion.create({
    PacID: req.params.id,
    FechaInicio: req.body.FechaInicio,
    FechaFin: req.body.FechaFin,
    Tratamiento: req.body.Tratamiento,
    Terapia: req.body.Terapia,
    TipoDePlan: Tipo,
    Cuidados: req.body.Cuidados,
    Intervenciones: req.body.Intervenciones,
    MedicID: req.session.IDUser
  });

  if (Tipo === 'Posterior') {
      const al = await AltasMedicas.create({
        PacID: req.params.id,
        Fecha: Sequelize.literal('CURRENT_DATE'),
        MedicID: req.session.IDUser,
        PlanID: plan.IDPlan
      });
      await HistInternacion.update({
        FechaFin: Sequelize.literal('CURRENT_DATE'),
        AltaID: al.IDAlta
      } , { where: { IDIntern: req.params.idd }
      })
      const cama = await Camas.findOne({ where: {Paciente: req.params.id} });
      const hab = await Habitacion.findByPk(cama.Habitacion)
      const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
      await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
      await Camas.update(
       { Paciente: null },
       { where: { Paciente: req.params.id } }
  );
  }
  console.log(plan);
  console.log(plan.IDPlan);
  console.log(req.params.idd);
  await HistInternacion.update({
    PlanID: plan.IDPlan
  } , { where: { IDIntern: req.params.idd } });
  const pac = Paciente.findByPk(req.params.id);
  res.redirect(`/inPac/${req.params.id}/Medicamentos/${plan.IDPlan}`);
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/AnadirEval', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  res.render('AnadirEval', { pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/AnadirEval', reqMedYEnf, async (req, res) => {
  try {
  await HistEvalFisica.create({
    PacID: req.params.id,
    TipoSangre: req.body.TipoSangre,
    Fisionomia: req.body.Fisionomia,
    SignoVital: req.body.SignoVital,
    Mediciones: req.body.Mediciones,
    Palpacion: req.body.Palpacion,
    Resonancia: req.body.REsonancia,
    Auscultacion: req.body.Auscultacion,
    Percusion: req.body.Percusion,
    Etnicidad: req.body.Etnicidad,
    Fecha: Sequelize.literal('CURRENT_DATE'),
    MedicID: req.session.IDUser
  });
  res.redirect("/inPac");
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
    const tipos = await TipoHab.findAll();
    const alas = await Ala.findAll();
    res.render('Habit', { Habits, camas, pacientes, tipos, alas});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/anadir', reqAdm , async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const Habits = await Habitacion.findAll();
    const camas = await Camas.findAll();
    const alas = await Ala.findAll();
    const tipos = await TipoHab.findAll();
    res.render('AnadirHab', { Habits, camas, pacientes, alas, tipos});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/anadir', reqAdm, async (req, res) => {
  try {
    await Habitacion.create({    
    Nombre: req.body.Nombre,
    AlaID: req.body.Ala,
    TipoID: req.body.Tipo
  });
    res.redirect('/Habitaciones');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/anadirCam', reqAdm, async (req, res) => {
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

router.post('/Habit/anadirCam', reqAdm, async (req, res) => {
  try {
    await Camas.create(req.body);
    res.redirect('/Habitaciones');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/inPac/:id/AltaPac', reqMed , async (req, res) => {
 try {
    const pac = await Paciente.findByPk(req.params.id);
    const int = await HistInternacion.findOne({where : { PacID: pac.IDPaciente }});
    console.log(int);
    res.render('AnadirAtencion', {pac, int, Tipo: 'Posterior'});
 } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

/*router.post('/inPac/:id/AltaPac', reqLv2, async (req, res) => {
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
});*/

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

router.get('/Cama/:id/eliminar', reqAdm,async (req, res) => {
 try {
   const cama = await Camas.findByPk(req.params.id);
   await Camas.destroy({ where: { IDCamas: req.params.id } });
   const hab = await Habitacion.findByPk(cama.Habitacion)
   const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
   /*if (camasDeHab.length === 0 || camasDeHab.every(c => c.Paciente === null)) {
    await Habitacion.update(
      { GeneroHab: "Vacio" },
      { where: { IDHab: hab.IDHab } }
    );
  }*/
   res.redirect('/Habitaciones');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/:id/editar', reqAdmYEnf, async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    const hab = await Habitacion.findByPk(req.params.id);
    const camas = await Camas.findAll();
    const alas = await Ala.findAll();
    const tipos = await TipoHab.findAll();
    res.render('EditHab', { hab, camas, pacientes, alas, tipos});
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/Habit/:id/editar', reqAdmYEnf, async (req, res) => {
  try {
   await Habitacion.update({
    Nombre: req.body.Nombre,
    AlaID: req.body.Ala,
    TipoID: req.body.Tipo
   }, { where: { IDHab: req.params.id } });
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

router.get('/Habit/:id/eliminar', reqAdm, async (req, res) => {
 try{
  await Camas.destroy({ where: { Habitacion: req.params.id }})
  await Habitacion.destroy({ where: { IDHab: req.params.id } });
  res.redirect('/Habitaciones');
 } catch (err) {
  console.error(err.message);
  res.redirect('/Error');
 }
});

router.get('/Emergencias', reqRec, async (req, res) => {
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

router.post('/Emergencias', reqRec, async (req, res) => {
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

router.get('/inPac/:id/editar', reqRec, async (req, res) => {
 try {
  const pac = await Paciente.findByPk(req.params.id);
  const pacientes = await Paciente.findAll(); 
  const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null && dni != pac.DNI);
  res.render('EditPac', { pac, dnis, pacientes });
 } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
 }
});

router.post('/inPac/:id/editar', reqRec, async (req, res) => {
 try {
  await Paciente.update(req.body, { where: { IDPaciente: req.params.id } });
  const pac = await Paciente.findByPk(req.params.id);
  const cam = await Camas.findAll({ where: { Paciente: pac.IDPaciente } });
  if(cam.length > 0){
   for (const cama of cam){
    const hab = await Habitacion.findByPk(cama.Habitacion);
    const camasDeHab = await Camas.findAll({ where: { Habitacion: hab.IDHab } });
    if(camasDeHab.length === 1){
     /*await Habitacion.update(
      { GeneroHab: pac.Genero},
      { where: { IDHab: cama.Habitacion} }
     );*/
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
          /*await Habitacion.update(
          { GeneroHab: pac.Genero},
          { where: { IDHab: cama.Habitacion} }
          );*/
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
router.get('/inPac/anadir', reqRec, async (req, res) => {
  try{
    const pacientes = await Paciente.findAll();
    const dnis = pacientes.map(p => p.DNI).filter(dni => dni != null);
    res.render('AnadirPac' , { dnis, pacientes });
  } catch (err) {
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.post('/inPac/anadir', reqRec, async (req, res) => {
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

router.get('/Users', reqAdm, async (req, res) => {
  try {
    const USERS = await User.findAll();
    const specs = await Especialidades.findAll();
    res.render('Users', { USERS, specs });
  } catch (err){
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.get('/Medics', reqRec, async (req, res) => {
  try {
    const USERS = await User.findAll({where: {Rol: "Doctor"}});
    const specs = await Especialidades.findAll();
    res.render('Medics', { USERS, specs });
  } catch (err){
   console.error(err.message); 
   res.redirect('/Error');
  }
});

router.get('/Users/:id/Eliminar', reqAdm, async (req, res) => {
  try {
    await User.destroy({ where: { IDUser: req.params.id } })
    res.redirect('/Users');
  } catch (err){
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/Users/:id/Editar', reqAdm, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const specs = await Especialidades.findAll();
    res.render('EditUser', { user, specs });
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Users/:id/Editar', reqAdm, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update({
      Usuario: req.body.Usuario,
      Pass: req.body.Pass,
      Rol: req.body.Rol,
      EspecialidadID: req.body.Especialidad
    });
    res.redirect('/Users');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/Register', reqAdm, async (req, res) => {
  try {
    //const tUSERS = await User.findAll();
    //const USERS = tUSERS.map(u => u.Usuario);
    const specs = await Especialidades.findAll();
    res.render('Register', {specs});
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/Users/Register', reqAdm, async (req, res) => {
  try {
    await User.create({
      Usuario: req.body.Usuario,
      Pass: req.body.Pass,
      Rol: req.body.Rol,
      EspecialidadID: req.body.Especialidad
    });
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

router.get('/About', async (req, res) => {
  res.render('About');
});

router.get('/inPac/:id/VistaMedica', reqNoAdm, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  res.render('VistaMedica', { pac });
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/PlanAtencionPac', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const plans = await PlanAtencion.findAll({ where: { PacID: pac.IDPaciente } });
  const medicIDs = [...new Set(plans.map(p => p.MedicID).filter(Boolean))];
  const meds = medicIDs.length ? await User.findAll({ where: { IDUser: medicIDs } }) : [];
  const PlanData = plans.map(plan => {
    const med = meds.find(m => m.IDUser === plan.MedicID) || null;
    return {
      ...plan.toJSON(),
      med
      };
    });
  res.render('PlanAtencionPac', {plans: PlanData, pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});
//quizas /inPac/:id/:idd/PlanAtencion? id por paciente y idd por plan
router.get('/inPac/:id/PlanAtencion/:idd', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const plan = await PlanAtencion.findByPk(req.params.idd);
  const med = await User.findOne({ where: { IDUser: plan.MedicID } });
  res.render('PlanAtencion', {pac, plan, med} );
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/Internaciones/:idd', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const intern = await HistInternacion.findByPk(req.params.idd);
  const med = await User.findOne({ where: { IDUser: intern.MedicID } });
  const plan = await PlanAtencion.findOne({ where: { IDPlan: intern.PlanID } });
  const alt = await AltasMedicas.findOne({ where: { IDAlta: intern.AltaID } });
  res.render('Internaciones', {pac, intern, med, plan, alt} );
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/InternacionPac', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const interns = await HistInternacion.findAll({ where: { PacID: req.params.id } });
  const medicIDs = [...new Set(interns.map(p => p.MedicID).filter(Boolean))];
  const meds = medicIDs.length ? await User.findAll({ where: { IDUser: medicIDs } }) : [];
  const plans = await PlanAtencion.findAll();
  const alts = await AltasMedicas.findAll();
  const interData = interns.map(intern => {
   const plan = plans.find(p => p.IDPlan === intern.PlanID);
   const med = meds.find(m => m.IDUser === plan.MedicID) || null;
   const alt = alts.find(a => a.IDAlta === intern.AltaID);
   return {
    ...intern.toJSON(),
    med,
    plan,
    alt
   };
   });
  res.render('InternacionPac', {pac, interns: interData} );
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/HistAltasPac', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const users = await User.findAll();
  const alts = await AltasMedicas.findAll({ where: { PacID: pac.IDPaciente } });
  const AltaData = alts.map(alts => {
   const med = users.find(c => c.IDUser === alts.MedicID);
   return {
    ...alts.toJSON(),
    med
   };
   });
  res.render('HistAltasPac', {alts: AltaData, pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/EvalFisica/:idd', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const eva = await HistEvalFisica.findByPk(req.params.idd);
  const med = await User.findOne({ where: { IDUser: eva.MedicID } });
  res.render('EvalFisica', {pac, eva, med});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/EvalFisicasPac', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const evals = await HistEvalFisica.findAll({ where: { PacID: pac.IDPaciente } });
  const users = await User.findAll()
  const evalData = evals.map(evals => {
   const med = users.find(c => c.IDUser === evals.MedicID);
   return {
    ...evals.toJSON(),
    med
   };
   });
  res.render('EvalFisicasPac', {evals: evalData, pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/CitasPac', reqNoAdm, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const citas = await Citas.findAll({ where: { PacID: pac.IDPaciente } });
  const users = await User.findAll()
  const citData = citas.map(citas => {
   const med = users.find(c => c.IDUser === citas.MedicID);
   return {
    ...citas.toJSON(),
    med
   };
   });
  res.render('CitasPac', {citas: citData, pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/CitasSelect/:id', reqNoAdm, async (req, res) => {
  try {
  const med = await User.findByPk(req.params.id);
  const citas = await Citas.findAll({ where: { MedicID: med.IDUser } });
  const pacs = await Paciente.findAll()
  const citData = citas.map(citas => {
   const pac = pacs.find(c => c.IDPaciente === citas.PacID);
   return {
    ...citas.toJSON(),
    pac
   };
   });
  res.render('CitasMed', {citas: citData, med});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/CitasMed', reqMed, async (req, res) => {
  try {
  const med = await User.findByPk(req.session.IDUser);
  const citas = await Citas.findAll({ where: { MedicID: med.IDUser } });
  const pacs = await Paciente.findAll()
  const citData = citas.map(citas => {
   const pac = pacs.find(c => c.IDPaciente === citas.PacID);
   return {
    ...citas.toJSON(),
    pac
   };
   });
  res.render('CitasMed', {citas: citData, med});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/Cirujia/:idd', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const ciru = await HistCirujias.findByPk(req.params.idd);
  const med = await User.findOne({ where: { IDUser: ciru.MedicID } });
  res.render('Cirujia', {pac, ciru, med});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/CirujiasPac', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);
  const cirus = await HistCirujias.findAll({ where: { PacID: pac.IDPaciente } });
  const users = await User.findAll()
  const ciruData = cirus.map(cirus => {
   const med = users.find(c => c.IDUser === cirus.MedicID);
   return {
    ...cirus.toJSON(),
    med
   };
   });
  res.render('CirujiasPac', {cirus: ciruData, pac});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/Medicamentos/:idd', reqMedYEnf, async (req, res) => {
  try {
  const pac = await Paciente.findByPk(req.params.id);  
  const plan = await PlanAtencion.findByPk(req.params.idd);
  const medis = await Medicamento.findAll({ where: { PlanID: plan.IDPlan } });
  res.render('Medicamentos', {medis, pac, plan});
    } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/AnadirMedicamento/:idd', reqMedYEnf, async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    const plan = await PlanAtencion.findByPk(req.params.idd);
    res.render('AnadirMedica', {pac, plan})
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/AnadirMedicamento/:idd', reqMedYEnf, async (req, res) => {
try {
  const pac = await Paciente.findByPk(req.params.id);
  const plan = await PlanAtencion.findByPk(req.params.idd);
  await Medicamento.create({
    PlanID: plan.IDPlan,
    Nombre: req.body.Nombre,
    Dosis: req.body.Dosis,
    Tiempo: req.body.Tiempo,
    Cantidad: req.body.Cantidad
  })
  res.redirect(`/inPac/${pac.IDPaciente}/Medicamentos/${plan.IDPlan}`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/AnadirCirujia', reqMed, async (req, res) =>{
try {
  const pac = await Paciente.findByPk(req.params.id)
  res.render('AnadirCirujia', {pac})
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/AnadirCirujia', reqMed, async (req, res) => {
try {
  const pac = await Paciente.findByPk(req.params.id);
  await HistCirujias.create({
    PacID: pac.IDPaciente,
    MedicID: req.session.IDUser,
    Fecha: req.body.Fecha,
    Tipo: req.body.Tipo,
    Estado: req.body.Estado,
    Diagnostico: req.body.Diagnostico,
    Resumen: req.body.Resumen
  });
  res.redirect(`/inPac/${pac.IDPaciente}/CirujiasPac`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/AnadirCita', reqRec, async (req, res) =>{
try {
  const pac = await Paciente.findByPk(req.params.id)
  const meds = await User.findAll({where: {Rol : "Doctor"}})
  res.render('AnadirCita', {pac, meds})
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/AnadirCita', reqRec, async (req, res) => {
try {
  const pac = await Paciente.findByPk(req.params.id);
  await Citas.create({
    PacID: pac.IDPaciente,
    MedicID: req.body.Medic,
    Fecha: req.body.Fecha,
    HoraFin: req.body.HoraFin,
    HoraInicio: req.body.HoraInicio,
    Tipo: req.body.Tipo
  });
  res.redirect(`/inPac/${pac.IDPaciente}/CitasPac`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/EditCita/:idd', reqRec, async (req, res) =>{
try {
  const pac = await Paciente.findByPk(req.params.id)
  const cita = await Citas.findByPk(req.params.idd);
  const meds = await User.findAll({where: {Rol : "Doctor"}})
  res.render('EditCita', {pac, meds, cita})
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/EditCita/:idd', reqRec, async (req, res) => {
try {
  const pac = await Paciente.findByPk(req.params.id);
  await Citas.update({
    PacID: pac.IDPaciente,
    MedicID: req.body.Medic,
    Fecha: req.body.Fecha,
    HoraFin: req.body.HoraFin,
    HoraInicio: req.body.HoraInicio,
    Tipo: req.body.Tipo
  }, {where: {IDCita: req.params.idd}});
  res.redirect(`/inPac/${pac.IDPaciente}/CitasPac`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/EditAtencion/:idd', reqMedYEnf, async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    const plan = await PlanAtencion.findByPk(req.params.idd);
    res.render('EditAtencion', {pac, plan});
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/EditAtencion/:idd', reqMedYEnf, async (req, res) => {
  try {
   await PlanAtencion.update({
    FechaInicio: req.body.FechaInicio,
    FechaFin: req.body.FechaFin,
    Tratamiento: req.body.Tratamiento,
    Terapia: req.body.Terapia,
    Intervenciones: req.body.Intervenciones,
    Cuidados: req.body.Cuidados 
  },{ where: { IDPlan: req.params.idd } });
   const pac = await Paciente.findByPk(req.params.id);
   res.redirect(`/inPac/${pac.IDPaciente}/PlanAtencionPac`);
  } catch (err){
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/EditMedicamento/:idd/:iddd', reqMedYEnf, async (req, res) => {
  try {
    const pac = await Paciente.findByPk(req.params.id);
    const plan = await PlanAtencion.findByPk(req.params.idd);
    const medi = await Medicamento.findByPk(req.params.iddd);
    res.render('EditMedicamento', {pac, plan, medi});
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.post('/inPac/:id/EditMedicamento/:idd/:iddd', reqMedYEnf, async (req, res) => {
  try {
   await Medicamento.update({
    Nombre: req.body.Nombre,
    Dosis: req.body.Dosis,
    Tiempo: req.body.Tiempo,
    Cantidad: req.body.Cantidad 
  },{ where: { IDMedicamento: req.params.iddd } });
   const pac = await Paciente.findByPk(req.params.id);
   const plan = await PlanAtencion.findByPk(req.params.idd);
   res.redirect(`/inPac/${pac.IDPaciente}/Medicamentos/${plan.IDPlan}`);
  } catch (err){
   console.error(err.message);
   res.redirect('/Error');
  }
});

router.get('/inPac/:id/ElimMedicamento/:idd/:iddd', reqMedYEnf, async (req, res) => {
  try {
    await Medicamento.destroy({where: {IDMedicamento: req.params.iddd}});
   const pac = await Paciente.findByPk(req.params.id);
   const plan = await PlanAtencion.findByPk(req.params.idd);
    res.redirect(`/inPac/${pac.IDPaciente}/Medicamentos/${plan.IDPlan}`);
  } catch (err) {
   console.error(err.message);
   res.redirect('/Error');
  }
});


router.get('/Habit/Ala', reqAdm, async (req, res) => {
  try {
    const alas = await Ala.findAll();
    res.render('Alas', {alas});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/TipoHab', reqAdm, async (req, res) => {
  try {
    const tipos = await TipoHab.findAll();
    res.render('TipoHab', {tipos});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/Especialidades', reqAdm, async (req, res) => {
  try {
    const specs = await Especialidades.findAll();
    res.render('Especialidades', {specs});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/AnadirAla', reqAdm, async (req, res) => {
  try {
    const alas = await Ala.findAll();
    const noms = alas.map(a => a.Nombre).filter(Nombre => Nombre != null);
    res.render('AnadirAla', {noms});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/AnadirTipo', reqAdm, async (req, res) => {
  try {
    const tipos = await TipoHab.findAll();
    const noms = tipos.map(a => a.Nombre).filter(Nombre => Nombre != null);
    res.render('AnadirTipo', {noms} );
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/AnadirEspec', reqAdm, async (req, res) => {
  try {
    const specs = await Especialidades.findAll();
    const noms = specs.map(a => a.Nombre).filter(Nombre => Nombre != null);
    res.render('AnadirEspec', {noms});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/EditAla/:id', reqAdm, async (req, res) => {
  try {
    const ala = await Ala.findByPk(req.params.id);
    const alas = await Ala.findAll();
    const noms = alas.map(a => a.Nombre).filter(Nombre => Nombre != null && Nombre !=  ala.Nombre);
    res.render('EditAla', {ala, noms});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/EditTipo/:id', reqAdm, async (req, res) => {
  try {
    const tipo = await TipoHab.findByPk(req.params.id);
    const tipos = await TipoHab.findAll();
    const noms = tipos.map(a => a.Nombre).filter(Nombre => Nombre != null && Nombre !=  tipo.Nombre);
    res.render('EditTipo', {tipo, noms});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/EditEspec/:id', reqAdm, async (req, res) => {
  try {
    const spec = await Especialidades.findByPk(req.params.id);
    const specs = await Especialidades.findAll();
    const noms = specs.map(a => a.Nombre).filter(Nombre => Nombre != null && Nombre !=  spec.Nombre);
    res.render('EditEspec', {spec, noms});
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/AnadirAla', reqAdm, async (req, res) => {
  try {
    Ala.create(req.body);
    res.redirect('/Habit/Ala');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/AnadirTipo', reqAdm, async (req, res) => {
  try {
    TipoHab.create(req.body);
    res.redirect('/Habit/TipoHab');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Users/AnadirEspec', reqAdm, async (req, res) => {
  try {
    Especialidades.create(req.body);
    res.redirect('/Users/Especialidades');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/EditAla/:id', reqAdm, async (req, res) => {
  try {
    Ala.update(req.body, {where: {IDAla: req.params.id}});
    res.redirect('/Habit/Ala');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Habit/EditTipo/:id', reqAdm, async (req, res) => {
  try {
    TipoHab.update(req.body, {where: {IDTipo: req.params.id}});
    res.redirect('/Habit/TipoHab');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.post('/Users/EditEspec/:id', reqAdm, async (req, res) => {
  try {
    Especialidades.update(req.body, {where: {IDEspecialidades: req.params.id}});
    res.redirect('/Users/Especialidades');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Users/ElimEspec/:id', reqAdm, async (req, res) => {
  try {
    Especialidades.destroy({where: {IDEspecialidades: req.params.id}});
    res.redirect('/Users/Especialidades');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/ElimAla/:id', reqAdm, async (req, res) => {
  try {
    Ala.destroy({where: {IDAla: req.params.id}});
    res.redirect('/Habit/Ala');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

router.get('/Habit/ElimTipo/:id', reqAdm, async (req, res) => {
  try {
    TipoHab.destroy({where: {IDTipo: req.params.id}});
    res.redirect('/Habit/TipoHab');
  } catch (err) {
    console.error(err.message);
    res.redirect('/Error');
  }
});

app.use('/', router);

//Las Imagenes
app.use('/Imagenes', express.static(path.join(__dirname, 'Imagenes')));

//puerto local

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
});
  } catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
})();

//please website project please work