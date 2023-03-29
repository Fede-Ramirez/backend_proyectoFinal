const logger = require('../services/log4jsConfig');
const { UserAPI, CartAPI } = require('../api');

const validateNewUser = (newUser) => {
    try {
        return (
            !newUser ||
            !newUser.firstName ||
            !newUser.lastName ||
            !newUser.phone ||
            !newUser.age ||
            !newUser.address ||
            !newUser.address.street ||
            !newUser.address.city
        );
    } catch (error) {
        logger.error(error);
    };
};

const getUserByEmail = async(email) => {
    try {
        const user = await UserAPI.findByEmail(email);
        return user;
    } catch (error) {
        logger.error(error);
    };
};

const createUser = async (userData) => {
    try {
        const newUser = await UserAPI.create(userData);
        await CartAPI.create(newUser._id);
        return newUser;
    } catch (error) {
        logger.error(error);
    };
};

const isLoggedIn = (req, res, done) => {
    try {
        logger.info('Está autenticado');
        logger.info(req.isAuthenticated());
        logger.info('req.user');
        logger.info(req.user);
    
        if (!req.isAuthenticated()) {
            return res.status(401).json({ msg: 'No estás autorizado/a' });
        };
    
        done();
    } catch (error) {
        logger.error(error);
    };
};

const logOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (!err) {
            res.status(200).json({
                msg: `Hasta luego!`
            })
        } 
        else {
            res.status(500).json({
                msg: 'Error al desloguearse'
            })
            logger.error(err);
        } 
})
};

const isAdmin = (req, res, done) => {
    try {
        logger.info('Middleware para administradores');
        logger.info(req.user);
    
        if (!req.user.admin || req.user.admin !== true ) {
            return res.status(401).json({ 
                msg: 'No estás autorizado - solo administradores' 
            });
        }
    
        done();
    } catch (error) {
        logger.error(error);
    };
};

module.exports = {
    validateNewUser,
    getUserByEmail,
    createUser,
    isLoggedIn,
    logOut,
    isAdmin
}