const { MessageModel } = require('../models/messages');

//API para mensajes a trabajar con websockets, comunicación con la DB

//Traer los mensajes de la DB, especialmente el que simula el "bot"
const get = async() => {
    const messages = await MessageModel.find();
    return messages;
};

//Crear un nuevo mensaje
const create = async(newMessage) => {
    const message = await MessageModel.create(newMessage);
    return message;
}

module.exports = {
    get,
    create
};