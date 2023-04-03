const logger = require('../services/log4jsConfig');
const { UserAPI, CartAPI } = require('../api');

//Controladores vinculados a todo lo asociado a la autenticación (se utilizan la UserAPI y la CartAPI)

//Validación de todos los campos que debe contener un nuevo usuario a registrar
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

//Traer a un usuario según su mail
const getUserByEmail = async(email) => {
    try {
        const user = await UserAPI.findByEmail(email);
        return user;
    } catch (error) {
        logger.error(error);
    };
};

//Crear un nuevo un usuario y su carrito correspondiente al mismo tiempo
const createUser = async (userData) => {
    try {
        const newUser = await UserAPI.create(userData);
        await CartAPI.create(newUser._id);
        return newUser;
    } catch (error) {
        logger.error(error);
    };
};

//Verificación de sesión iniciada
const isLoggedIn = (req, res, done) => {
    try {
        logger.info('Está autenticado');
        logger.info(req.isAuthenticated());
        logger.info('req.user');
        logger.info(req.user);
    
        if (!req.isAuthenticated()) {
            return res.status(401).json({ msg: 'No estás autorizado/a, debes iniciar sesión' });
        };
    
        done();
    } catch (error) {
        logger.error(error);
    };
};

//Cerrar sesión
const logOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (!err) {
            res.status(200).json({
                msg: `Hasta luego, gracias por visitarnos!`
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