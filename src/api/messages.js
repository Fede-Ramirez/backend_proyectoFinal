const { MessageModel } = require('../models/messages');

const get = async() => {
    const messages = await MessageModel.find();
    return messages;
};

const create = async(newMessage) => {
    const message = await MessageModel.create(newMessage);
    return message;
}

module.exports = {
    get,
    create
};