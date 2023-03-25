const { MessageAPI } = require('../api');
const logger = require('./log4jsConfig');

const initMessageDatabase = async() => {
    const initialMessage ={
        user: '507f191e810c19729de860ea',
        type: 'sistema',
        message: 'Hola! Bienvenido al chatbot, ¿en qué te puedo ayudar?'
    }

    const createdMessage = await MessageAPI.create(initialMessage);
    logger.info('Mensaje insertado en la DB!');
    return createdMessage;
};

module.exports = { initMessageDatabase };