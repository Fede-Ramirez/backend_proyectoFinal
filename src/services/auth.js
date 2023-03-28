const passport = require('passport');
const { Strategy } = require('passport-local');
const { UserModel } = require('../models/users');
const { validateNewUser, getUserByEmail, createUser } = require('../controllers/users');
const logger = require('./log4jsConfig');
const NotificationService = require('./notifications'); 

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const login = async (req, username, password, done) => {
    logger.info('Realizando log in');

    const user = await getUserByEmail(username);

    if (!user) {
        return done(null, false, { message: 'Usuario o contraseña inválidos' });
    };

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
        return done(null, false, { message: 'Usuario o contraseña inválidos' });
    };

    logger.info('Log in realizado con éxito');
    return done(null, user);
};

const signup = async (req, username, password, done) => {
    try {
        logger.info('Realizando registro de nuevo usuario');
        logger.info(req.body);
        const { firstName, lastName, phone, age, admin, address } = req.body;

        if (validateNewUser(req.body)) {
            logger.error('Campos inválidos');
            return done(null, false, { message: 'Campos inválidos' });
        };

        const user = await getUserByEmail(username);

        if (user) {
            logger.error('El usuario ya existe');
            return done(null, false, { message: 'El usuario ya existe' });
        } else {
            const userData = {
                email: username,
                password,
                firstName,
                lastName,
                phone,
                age,
                admin,
                address,
            };

            const newUser = await createUser(userData);
            await NotificationService.notifyNewUserByEmail(newUser);
            return done(null, newUser);
        }
    } catch (error) {
        done(error);
    }
};

const loginFunction = new Strategy(strategyOptions, login);
const signUpFunction = new Strategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
    logger.info('Se Ejecuta el serializeUser');
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    logger.info('Se Ejecuta el desserializeUser');
    UserModel.findById(userId).then((user) => {
        return done(null, user);
    });
});

module.exports = {
    loginFunction,
    signUpFunction
}
