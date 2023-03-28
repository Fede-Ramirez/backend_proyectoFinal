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

const isAdmin = (req, res, done) => {
    try {
        logger.info('Middleware para administradores');
        logger.info(req.user);
    
        if (!req.user.admin) {
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
    isAdmin
}