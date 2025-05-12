const pug = require('pug');
var express = require('express');
var app = express();
const port = 3000;

app.set('view engine', 'pug');
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
})

app.listen(port, () => {
    console.log("iniciado");
})