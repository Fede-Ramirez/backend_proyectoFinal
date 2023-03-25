const logger = require('../services/log4jsConfig');
const { MessageAPI } = require('../api');

const getMessages = async() => {
    try {
        const messages = await MessageAPI.get();
        return messages;
    } catch (error) {
        logger.error(error);
    };
};

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