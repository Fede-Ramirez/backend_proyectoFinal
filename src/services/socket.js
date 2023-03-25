const socketIo = require('socket.io');
const logger = require('./log4jsConfig');
const { MessageController } = require('../controllers');
const { MessageAPI } = require('../api');

let io;

const initWebsocketServer = async(server) => {
    io = socketIo(server);

    io.on('connection', async (socket) => {
        logger.info('Se ha establecido una nueva conexión con socket.io');

        socket.on('newMessage', async message => {
            await MessageAPI.create(message);
            io.sockets.emit('renderMessage', await MessageController.getMessages());
        });
    });
    return io;
};

module.exports = { initWebsocketServer };
