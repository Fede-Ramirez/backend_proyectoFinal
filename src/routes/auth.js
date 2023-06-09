const passport = require('passport');
const { Router } = require('express');
const logger = require('../services/log4jsConfig');
const { logOut } = require('../controllers/users');
const passportOptions = { badRequestMessage: 'Usuario o contraseña inválidos' };

const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        logger.info('Información de registro:');
        logger.info(err, user, info);

        if (err) {
        return next(err);
        };

        if (!user) {
            return res.status(401).json({ 
                data: info 
            });
        } 

        res.json({ 
            msg: 'Registro realizado con éxito', 
            user 
        });

    })(req, res, next);
};

const logIn = (req, res, next) => {
    passport.authenticate('login', passportOptions, (err, user, info) => {
        if (err) {
        return next(err);
        };

        if (!user) {
            return res.status(401).json({ data: info }); 
        }

        req.logIn(user, function (err) {
            return res.json({ 
                msg: 'Log in realizado con éxito', 
                user 
            });
        });
    })(req, res, next);
};

const router = Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.post('/logout', logOut);

module.exports = router;