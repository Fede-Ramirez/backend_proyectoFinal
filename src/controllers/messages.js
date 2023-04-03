const logger = require('../services/log4jsConfig');
const { MessageAPI } = require('../api');

//Controladores de mensajes asociados al chat de websockets (se utiliza la MessageAPI)

//Traer los mensajes de la base de datos
const getMessages = async() => {
    try {
        const messages = await MessageAPI.get();
        return messages;
    } catch (error) {
        logger.error(error);
    };
};

//Envíar un mensaje al chat y a la DB
const createMessage = async (messageText) => {
    try {
        const newMessage = await MessageAPI.create(messageText);
        return newMessage;
    } catch (error) {
        logger.error(error);
    };
};

module.exports = {
    getMessages,
    createMessage
};