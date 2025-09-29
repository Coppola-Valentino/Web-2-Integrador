const bcrypt = require('bcrypt');
const User = require('../models/Usuario');

const auther = async (req, res, next) => {
    try {
        const {Pass, Usuario} = req.body;
        if (!Pass || !Usuario) {
            return res.render('/Login', {err: 'Faltan datos'});
        }

        const user = await User.findOne({where: {Usuario}});
        if (!user) {
            return res.render('Login', {err: 'Usuario o Contraseña incorrectas'});
        }

        const valido = await User.Validar(Pass);

        if (!valido) {
            return res.render('Login', {err: 'Usuario o Contraseña incorrectas'});
        }

        req.session.IDUser = user.IDUser;
        req.session.Usuario = user.Usuario;
        req.session.Rol = user.Rol;

        next();
    } catch (err) {
        res.redirect('/Error', {err: err.message});
    }
}

const getUser = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findByPk(req.session.userId);
            res.activeUser = user;
            res.locals.activeUser = user;
        } catch (err) {
            return res.redirect('/Error', {err: err.message});
        }
    }
    next();
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/Error', {err: err.message});
        }
        res.clearCookie('connect.sid');
        res.redirect('/Login');
    });
};

const reqAuther = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/Login');
    }
    next();
}

const reqLv1 = (req, res, next) => {
    if (req.session.Rol !== 'Enfermero' && req.session.Rol !== 'Doctor' && req.session.Rol !== 'Admin') {
        return res.redirect('/Error', {err: 'No tienes permiso para acceder a esta pagina'});
    }
    next();
}

const reqLv2 = (req, res, next) => {
    if (req.session.Rol !== 'Doctor' && req.session.Rol !== 'Admin') {
        return res.redirect('/Error', {err: 'No tienes permiso para acceder a esta pagina'});
    }
    next();
}

const reqLv3 = (req, res, next) => {
    if (req.session.Rol !== 'Admin') {
        return res.redirect('/Error', {err: 'No tienes permiso para acceder a esta pagina'});
    }
    next();
}

module.exports = { reqAuther, auther, getUser, logout, reqLv1, reqLv2, reqLv3};