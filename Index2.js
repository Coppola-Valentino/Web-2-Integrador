//const pug = import('pug');
//var express = import('express');
//var app = express();
//const port = 3000;
const { Sequelize } = require('sequelize');

/*app.set('view engine', 'pug');
app.set('views', './pugs');

app.use(express.static('Imagenes'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/Home', (req, res) => {
    res.render('home');
})
app.get('/inPac', (req, res) => {
    res.render('inPac');
})
app.get('/Emergencias', (req, res) => {
    res.render('emerg');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('regis');
})
app.get('/Turnos', (req, res) => {
    res.render('turn');
})
app.get('/adm', (req, res) => {
    res.render('adm');
})*/

const sequelize = new Sequelize({
  dialect: 'mysql',
  storage: 'web2_2.sql'
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

/*app.listen(port, () => {
    console.log("iniciado");
})*/