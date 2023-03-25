const { MessageAPI } = require('../api');
const logger = require('./log4jsConfig');

const initMessageDatabase = async() => {
    const initialMessage ={
        email: 'botihelpcenter@gmail.com',
        type: 'sistema',
        message: 'Hola! Bienvenido al chatbot, ¿En qué te puedo ayudar?'
    }

    const createdMessage = await MessageAPI.create(initialMessage);
    logger.info('Mensaje insertado en la DB!');
    return createdMessage;
};

module.exports = { initMessageDatabase };