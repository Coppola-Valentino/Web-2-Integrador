const { Sequelize } = require('sequelize');
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

const sequelize = new Sequelize('web2.2', 'bingus', 'merequetenge', {
host: 'localhost',
dialect: 'mysql',
logging: false,
port: 3306,
});


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
    res.render('Emergencias'); 
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