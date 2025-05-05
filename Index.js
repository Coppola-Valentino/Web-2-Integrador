const pug = require('pug');
var express = require('express');
var app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './pugs');

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


app.listen(port, () => {
    console.log("iniciado");
})