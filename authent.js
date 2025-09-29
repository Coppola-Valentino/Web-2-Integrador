const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

const User = require('./models/Usuario');

const auther = async (req, res, next) => {
    try {
        const {Pass, Usuario} = req.body;
        if (!Pass || !Usuario) {
            return res.render('Login');
        }

        const user = await User.findOne({where: {Usuario}});
        if (!user) {
            return res.render('Login');
        }

        const valido = await user.validar(Pass);

        if (!valido) {
            return res.render('Login');
        }

        req.session.IDUser = user.IDUser;
        req.session.Usuario = user.Usuario;
        req.session.Rol = user.Rol;

        next();
    } catch (err) {
        console.log(err.message);
        res.redirect('/Error');
    }
}

const getUser = async (req, res, next) => {
    if (req.session.IDUser) {
        try {
            const user = await User.findByPk(req.session.IDUser);
            res.activeUser = user;
            res.locals.activeUser = user;
        } catch (err) {
            return res.redirect('/Error');
        }
    }
    next();
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/Error');
        }
        res.clearCookie('connect.sid');
        res.redirect('/Login');
    });
};

const reqAuther = async (req, res, next) => {
    if (!req.session.IDUser) {
        return res.redirect('/Login');
    }
    next();
}

const reqLv1 = (req, res, next) => {
    if (req.session.Rol !== 'Enfermero' && req.session.Rol !== 'Doctor' && req.session.Rol !== 'Admin') {
        return res.redirect('/Error');
    }
    next();
}

const reqLv2 = (req, res, next) => {
    if (req.session.Rol !== 'Doctor' && req.session.Rol !== 'Admin') {
        return res.redirect('/Error');
    }
    next();
}

const reqLv3 = (req, res, next) => {
    if (req.session.Rol !== 'Admin') {
        return res.redirect('/Error');
    }
    next();
}

module.exports = { reqAuther, auther, getUser, logout, reqLv1, reqLv2, reqLv3};